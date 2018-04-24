using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Json;
using System.Text;

namespace UserManager.DTO
{
    public class ActiveConsignmentDTO : ConsignmentDTO
    {
        public string Content { get; set; }

        public string LastSeenCity => LastSeenEventWithLocation?.location.city;

        public string LastSeenTimeStamp
        {
            get
            {
                return LastSeenEventWithLocation?.eventTime.ToShortDateString();
            }
        }

        public string DropOffDate
        {
            get
            {
                return ShipmentInformation?.items.LastOrDefault()?.dropOffDate.ToShortDateString();
            }
        }

        public Consignor Consignor => ShipmentInformation.consignor;

        public Consignee Consignee => ShipmentInformation.consignee;

        private PostnordShipmentResponseDTO ContentModel
        {
            get
            {
                var jObject = JObject.Parse(Content);

                return jObject.ToObject<PostnordShipmentResponseDTO>();
            }
        }

        private Shipment ShipmentInformation => ContentModel.trackingInformationResponse.shipments.FirstOrDefault();

        private Event LastSeenEventWithLocation
        {
            get
            {
                //Looks through events to find most recent city with value
                //return ContentModel.trackingInformationResponse.shipments.FirstOrDefault()?.items.LastOrDefault()?
                //    .events.Where(x => x.location.city != null).LastOrDefault().location.city;

                return ContentModel.trackingInformationResponse.shipments.FirstOrDefault()?.items.LastOrDefault()?
                    .events.Where(x => x.location.city != null && x.eventTime != null).LastOrDefault();
            }
        }
    }
}