/**
 * Clase personalizada para manejar errores con información adicional sobre el código de estado HTTP.
 */
class ErrorHandler extends Error {
  statusCode: number;

  /**
   * Constructor de la clase ErrorHandler.
   * @param statusCode Código de estado HTTP asociado al error.
   * @param message Mensaje descriptivo del error.
   */
  constructor(statusCode: number, message: any) {
      // Llama al constructor de la clase base (Error) con el mensaje proporcionado
      super(message);
      // Asigna el código de estado al objeto
      this.statusCode = statusCode;
      // Captura la pila de llamadas para obtener más información sobre el origen del error
      Error.captureStackTrace(this, this.constructor);
  }
}

// Exporta la clase ErrorHandler para su uso en otros módulos
export default ErrorHandler;
