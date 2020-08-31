using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Comments;

namespace Application.Activities
{
    public class ActivityDto
    {
        public Guid Id {get; set;}

        public string Title {get; set;}

        public string Description {get; set;}

        public string Category {get; set; }

        public DateTime Date {get; set; }

        public string City {get; set;}

        public string Venue {get; set;}

//This simply changes the name from UserActivities to attendees
//The reason we don't just change the name directly is so that AutoMapper can easily map from
//Activity to ActivityDto
        [JsonPropertyName("attendees")]
        public ICollection<AttendeeDto> UserActivities { get; set; }

        public ICollection<CommentDto> Comments { get; set; }
    }
}