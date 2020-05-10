using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Unattend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // handler logic
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound,
                        new { Activity = "Could not find activity" });
                }

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var attendance = await _context.UserActivities.SingleOrDefaultAsync(x => x.ActivityId == activity.Id
                && x.AppUserId == user.Id);

                if (attendance == null)
                {
                    //return Unit.value; <-- this is what Neil does, but I am throwing an error to test it
                    throw new RestException(HttpStatusCode.BadRequest,
                        new { Attendance = "You are not attending this activity" });
                }

                //We must check if the user is the host of this activity, hosts cannot remove themselves
                else if (attendance.IsHost)
                {
                    throw new RestException(HttpStatusCode.BadRequest,
                        new { Attendance = "You cannot remove yourself as host" });
                }

                _context.UserActivities.Remove(attendance);

                var success = await _context.SaveChangesAsync() > 0;  //success is a boolean checking if request was successful

                if (success)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem saving changes.");
            }
        }
    }
}