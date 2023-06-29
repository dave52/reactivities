using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>?> GetActivities()
        {
            if (Mediator != null)
            {
                return await Mediator.Send(new List.Query());
            }
            return null;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>?> GetActivity(Guid id)
        {
            if (Mediator != null)
            {
                return await Mediator.Send(new Details.Query{Id = id});
            }
            return null;
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok(await Mediator!.Send(new Create.Command{Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok(await Mediator!.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator!.Send(new Delete.Command{Id = id}));
        }
    }
}