using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UserManager.Core;
using UserManager.Core.Enums;
using UserManager.Core.Interfaces;
using UserManager.Core.Mappers;
using UserManager.Core.Services;
using UserManager.DTO;

namespace UserManager.Core.Repositories
{
    public class PersonRepository : Repository<person>, IPersonRepository
    {
        protected PersonCrypography _personCryptography = new PersonCrypography();

        public PersonRepository(masterEntitiesMYSQL context) : base(context)
        {

        }

        /// <summary>
        /// Add new Person
        /// </summary>
        /// <param name="personDTO"></param>
        public person AddPerson(IPerson personDTO)
        {
            var entity = Mapper.Map<person>(personDTO);

            Context.person.Add(entity);
            Context.SaveChanges();

            return entity;
        }

        /// <summary>
        /// Authenticate Person credentials
        /// </summary>
        /// <param name="personDTO"></param>
        /// <returns></returns>
        public PersonDTO Authenticate(PersonForUpdateDTO personDTO)
        {
            //Hitta matchande användare. returnera res 200 & token
            using (masterEntitiesMYSQL context = new masterEntitiesMYSQL())
            {
                var encryptedPassword = CryptographyService.Encrypt(personDTO.Password);

                IEnumerable<person> findPerson = context.person.Where(x => x.Email == personDTO.Email && x.Password == encryptedPassword);

                var matchedPerson = findPerson != null && findPerson.Count() > 0 ? findPerson.FirstOrDefault() : null;

                var matchedPersonDTO = Mapper.Map<PersonDTO>(matchedPerson);

                if (matchedPerson == null)
                    throw new ArgumentException("InvalidCredentials");

                return _personCryptography.GenerateSignature(matchedPersonDTO);
            }
        }

        public PersonDTO AuthenticateBankId(BankIdCollectDto collectDto)
        {
            //Users nullUser = null;
            var findPerson = Context.person.Where(x => x.PersonId == collectDto.completionData.user.personalNumber).FirstOrDefault();

            //var matchedPerson = findPerson != null ? findPerson : null;
            if (findPerson == null)
                return null;

            var matchedPersonDTO = Mapper.Map<PersonDTO>(findPerson);

            return _personCryptography.GenerateSignature(matchedPersonDTO);
        }

    }
}