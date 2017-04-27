use rand::{thread_rng, Rng};
use sozu_command::data::{AnswerData,ConfigCommand,ConfigMessage,ConfigMessageStatus};
use std::io;
use ::SozuChannel;

fn generate_id() -> String {
  let s: String = thread_rng().gen_ascii_chars().take(6).collect();
  format!("ID-{}", s)
}

pub fn list(channel: &mut SozuChannel) -> Result<Option<AnswerData>, io::Error> {
  let id = generate_id();
  channel.write_message(&ConfigMessage::new(
    id.clone(),
    ConfigCommand::ListWorkers,
    None,
  ));

  match channel.read_message() {
    None          => Err(io::Error::new(io::ErrorKind::BrokenPipe, "the proxy didn't answer")),
    Some(message) => {
      if id != message.id {
        return Err(io::Error::new(io::ErrorKind::InvalidInput, format!("received message with invalid id: {:?}", message)));
      }
      match message.status {
        ConfigMessageStatus::Processing => {
          // do nothing here
          // for other messages, we would loop over read_message
          // until an error or ok message was sent
            Ok(None)
        },
        ConfigMessageStatus::Error => {
        return Err(io::Error::new(io::ErrorKind::InvalidData, format!("Error: {}", message.message)));
        },
        ConfigMessageStatus::Ok => {
            Ok(message.data)
        }
      }
    }
  }
}
