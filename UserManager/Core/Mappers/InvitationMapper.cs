using AutoMapper;
using UserManager.DTO;

namespace UserManager.Core.Mappers
{
    public abstract class InvitationMapper
    {
        public Invitation DtoToEntityMapping(InvitationDTO invitationDTO)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<InvitationDTO, Invitation>();
            });
            IMapper mapper = config.CreateMapper();

            return mapper.Map<InvitationDTO, Invitation>(invitationDTO);
        }

        public InvitationDTO EntityToDtoMapping(Invitation invitation)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<Invitation, InvitationDTO>();
            });
            IMapper mapper = config.CreateMapper();

            return mapper.Map<Invitation, InvitationDTO>(invitation);
        }
    }
}