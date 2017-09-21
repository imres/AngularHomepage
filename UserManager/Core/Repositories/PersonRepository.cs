using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.Core;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers.ToEntity;
using UserManager.DTO;

namespace UserManager.Core.Repositories
{
    public class PersonRepository : PersonMapper, IPerson
    {
        protected PersonCrypography _personCryptography = new PersonCrypography();

        /// <summary>
        /// Add new Person
        /// </summary>
        /// <param name="personDTO"></param>
        public void AddPerson(PersonDTO personDTO)
        {
            using (masterEntities context = new masterEntities())
            {
                personDTO.RegisterDate = DateTime.Now;
                personDTO.UserRights = personDTO.PersonId == 0 ? PersonUserRights.Read : PersonUserRights.Write;

                var entity = DtoToEntityMapping(personDTO);

                context.Person.Add(entity);
                context.SaveChanges();
            };
        }

        /// <summary>
        /// Authenticate Person credentials
        /// </summary>
        /// <param name="personDTO"></param>
        /// <returns></returns>
        public PersonDTO Authenticate(PersonDTO personDTO)
        {
            //Hitta matchande användare. returnera res 200 & token
            using (masterEntities context = new masterEntities())
            {
                //Users nullUser = null;
                IEnumerable<Person> findPerson = context.Person.Where(x => x.Email == personDTO.Email && x.Password == personDTO.Password);
                var matchedPerson = findPerson != null && findPerson.Count() > 0 ? findPerson.FirstOrDefault() : null;
                var matchedPersonDTO = EntityToDtoMapping(matchedPerson);

                try
                {
                    return _personCryptography.GenerateSignature(personDTO, matchedPersonDTO);
                }
                catch (Exception)
                {
                    return null;
                }
            }
        }

        public override Person DtoToEntityMapping(PersonDTO personDTO)
        {
            return base.DtoToEntityMapping(personDTO);
        }

    }
}