package io.github.fgribreau;

public class FailedInitializationException extends RuntimeException{

  public FailedInitializationException() {
  }

  public FailedInitializationException(String message) {
    super(message);
  }

  public FailedInitializationException(String message, Throwable cause) {
    super(message, cause);
  }

  public FailedInitializationException(Throwable cause) {
    super(cause);
  }

  public FailedInitializationException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
    super(message, cause, enableSuppression, writableStackTrace);
  }
}
