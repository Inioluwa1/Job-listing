import React, { useEffect, useState } from 'react'
import "./MainPage.css"
import JobListingCard from './JobListingCard'

export default function MainPage() {
  const [joblisting, setJoblisting] = useState([])
  const [displayJobs, setdisplayJobs] = useState([])
  const [filters, setFilters] = useState([])
  

  //runs once to check for 
  useEffect(() => {
    async function fetchJobLisiting(){
      const response = await fetch('/data.json')
      const jobs = await response.json()
      setJoblisting(jobs)
      setdisplayJobs(jobs)
      console.log(jobs)
    }
    fetchJobLisiting()

    
  }, [])
  
  //change display based on filters
 useEffect(() => {
  if (filters?.length === 0) {
    setdisplayJobs(joblisting)
  } else {
    const newjobs = joblisting.filter(job => filters.every(filter => job.languages.includes(filter) || job.role === filter || job.tools.includes(filter)))
    console.log(filters.length)

    setdisplayJobs(newjobs)
  }

 }, [filters])

 const removeFilter = (filter) => {
    setFilters(prev => prev.filter(f => f != filter))
    
 }

 const clearfilters = () => {
  setFilters([])
 }


  return (
    <div className={`MainPageContainer ${displayJobs.length <= 5? "display" : ""}`}>
      <div className='MainPage'>
        
        {filters.length !== 0 &&
        <div className='Searchbar'>
          <div className="Search">
            {filters.map ((filter, index) => (
              <span className='Filtered' key={index}>
                <p> {filter} </p> 
                <img src='icon-remove.svg' className='Close' onClick={() => removeFilter(filter)} />
              </span>
            ))}
            </div>
            <p className='Clear' onClick={clearfilters}> Clear </p>
        </div>}

        <JobListingCard 
          displayJobs={displayJobs} setdisplayJobs={setdisplayJobs}
          filters={filters} setFilters={setFilters}/>
      </div>
    </div>
  )
}
