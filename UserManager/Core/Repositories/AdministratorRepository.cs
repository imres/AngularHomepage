using System;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers;

namespace UserManager.Core.Repositories
{
    public class AdministratorRepository : CustomMapper, IAdministratorRepository
    {

        /// <summary>
        /// Truncate the specified table
        /// </summary>
        /// <param name="TableName">Enter name of table to truncate</param>
        public void CleanTable(string TableName)
        {
            using (var context = new masterEntitiesMYSQL())
            {
                var tableType = context.GetType().GetProperty(TableName).GetType();
                var query = string.Format("TRUNCATE TABLE [{0}]", TableName);

                context.Database.ExecuteSqlCommand(query);
            }
        }
    }
}