import Button from "@/components/ui/button";
import { getFilteredEvents } from "@/dummy-data";
//import Button from "@/components/ui/button";
import { useRouter } from "next/router";
import { Fragment } from "react";

//import ResultsTitle from 'next/router';
import EventList from "@/components/events/event-list";
//import Button from "@/components/ui/button";

function FilteredEventsPage () {
const router = useRouter();
const filteredData = router.query.slug;

if (!filteredData) {
  return <p className='center'>Loading...</p>;
}

const filteredYear = filteredData[0];
const filteredMonth = filteredData[1];

const numYear = +filteredYear;
const numMonth = +filteredMonth;

if(isNaN(numYear) || 
isNaN(numMonth) || 
numYear < 2020 ||
//  numYear < 2021 || 
numMonth < 1 || 
numMonth > 12
) {
  return (
  <Fragment>
    <p>Invalid filter. Please adjust your values!</p>
<div className='center'>
      <Button link='/events'>Show All Events</Button>
      </div>

  </Fragment>
  );
  
}

const filteredEvents = getFilteredEvents( {
  year: numYear,
  month: numMonth,
});

if (!filteredEvents || filteredEvents.length ===0) {
  return (
    <Fragment>
      <p>No events found for the chosen filter!</p>
      <div className='center'>
      <Button link='/events'>Show All Events</Button>
      </div>
    </Fragment>
  );
}

  const date = new Date(numYear, numMonth - 1);

    return (
      <Fragment> 
      
         {/* <ResultsTitle date={date} /> */}
         <h3>Events in {new Date(date).toLocaleDateString('en-gb',{year:'2-digit',month:'short'})}</h3>
        <EventList items={filteredEvents }/>

       <div>
         <h1>Filtered Events</h1>
      </div>
      
       </Fragment>
       
    );
    
  }
  
  export default FilteredEventsPage;