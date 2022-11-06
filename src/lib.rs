#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

extern crate meval;

use napi::Error;

#[napi]
pub fn evaluate (expression: String) -> Result<f64, Error> {
  match meval::eval_str(expression) {
    Ok(result) => Ok(result),
    Err(err) => Err(Error::from_reason(err.to_string()))
  }
}
