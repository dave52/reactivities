using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly IHostEnvironment _env;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly RequestDelegate _next;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context) // HttpContext is the current HTTP request
        {
            try
            {
                await _next(context); // if there is no exception, then the request will be passed to the next middleware
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message); // log the exception
                context.Response.ContentType = "application/json"; // set the response type to JSON
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError; // set the status code to 500, and cast as an int
                var response = _env.IsDevelopment() // if the environment is development, then return the exception message and stack trace
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode, "Server Error"); // otherwise, return a generic message
                var options = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase}; // set the JSON options
                var json = JsonSerializer.Serialize(response, options); // serialize the response
                await context.Response.WriteAsync(json); // write the response to the HTTP response
            }
        }
    }
}