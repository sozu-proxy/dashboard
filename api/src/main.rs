#![deny(warnings)]
#![feature(plugin)]
#![plugin(rocket_codegen)]

//! This crate provide a way to interact with sozu_proxy through REST api
#[macro_use] extern crate rocket_contrib;
extern crate mio_uds;
extern crate rand;
extern crate rocket;
extern crate serde_json;
extern crate sozu_command_lib as sozu_command;
extern crate sozu_lib as sozu;
extern crate unix_socket;

use mio_uds::UnixStream;
use rocket::State;
use rocket_contrib::{JSON, Value};
use sozu::channel::Channel;
use sozu_command::data::{ConfigMessage,ConfigMessageAnswer};
use std::env;
use std::sync::Mutex;

const SOCKET_ENV_VAR:&'static str = "SOZU_SOCKET_PATH";

type SozuChannel = Channel<ConfigMessage, ConfigMessageAnswer>;

mod command;

#[get("/", format = "application/json")]
fn get_workers(channel: State<Mutex<SozuChannel>>) -> Option<JSON<Value>> {
    let mut channel = channel.lock().unwrap();

    let data = command::workers::list(&mut channel);

    Some(JSON(json!( data.unwrap() )))
}

#[error(404)]
fn not_found() -> JSON<Value> {
    JSON(json!({
        "status": "error",
        "reason": "Resource was not found."
    }))
}
fn rocket(channel: SozuChannel) -> rocket::Rocket {
    rocket::ignite()
        .mount("/workers", routes![get_workers])
        .catch(errors![not_found])
        .manage(Mutex::new(channel))
}

fn connect_to_sozu(socket_path: &str) -> SozuChannel {
    let stream = UnixStream::connect(socket_path).expect("could not connect to the command unix socket");
    let mut channel: SozuChannel = Channel::new(stream, 10000, 20000);
    channel.set_nonblocking(false);

    channel
}

fn main() {
    let socket_path = match env::var(SOCKET_ENV_VAR) {
        Ok(val) => val,
        Err(e) => panic!("{}: {}", SOCKET_ENV_VAR, e),
    };
    rocket(connect_to_sozu(&socket_path))
        .launch();
}
