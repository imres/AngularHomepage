using Quartz;
using Quartz.Impl;
using System;

namespace UserManager.Core.Listeners
{
    public class JobScheduler
    {
        public static void Start()
        {
            //DOC: https://www.mikesdotnetting.com/article/254/scheduled-tasks-in-asp-net-with-quartz-net
            IScheduler scheduler = StdSchedulerFactory.GetDefaultScheduler().GetAwaiter().GetResult();
            scheduler.Start();

            IJobDetail job = JobBuilder.Create<UpdatePostnordDataJob>().Build();

            ITrigger trigger = TriggerBuilder.Create()
                .StartNow()
                .WithSimpleSchedule(x => x
                    .WithIntervalInSeconds(25)
                    .RepeatForever())
                .Build();

            scheduler.ScheduleJob(job, trigger);
        }
    }
}