using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
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

        public Weight Weight => ShipmentInformation?.items.LastOrDefault()?.statedMeasurement?.weight;

        public Width Width => ShipmentInformation?.items.LastOrDefault()?.statedMeasurement?.width;

        public Height Height => ShipmentInformation?.items.LastOrDefault()?.statedMeasurement?.height;

        public string LastSeenTimeStamp
        {
            get
            {
                return LastSeenEventWithLocation?.eventTime.Value.ToShortDateString();
            }
        }

        public string DropOffDate
        {
            get
            {
                return ShipmentInformation?.items.LastOrDefault()?.dropOffDate.Value.ToShortDateString();
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

        public Location DropOffLocation
        {
            get
            {
                return ShipmentInformation?.items?.LastOrDefault()?.events?.FirstOrDefault()?.location;
            }
        }

        public IEnumerable<Event> Events
        {
            get
            {
                return ShipmentInformation?.items?.FirstOrDefault()?.events.ToList();
            }
        }

        public Service Service
        {
            get
            {
                return ShipmentInformation?.service;
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