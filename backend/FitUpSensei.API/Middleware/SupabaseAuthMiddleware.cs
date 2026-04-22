using System.Security.Claims;

namespace FitUpSensei.API.Middleware;

public class SupabaseAuthMiddleware
{
    private readonly RequestDelegate _next;

    public SupabaseAuthMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.User.Identity?.IsAuthenticated == true)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier)
                         ?? context.User.FindFirstValue("sub");

            if (userId is not null)
            {
                context.Items["UserId"] = userId;
            }
        }

        await _next(context);
    }
}
