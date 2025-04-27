import React, { useEffect, useState } from 'react'
import "./JobListingCard.css"

export default function JobListingCard({displayJobs, setdisplayJobs, setFilters, filters}) {


  const handleRoleFilter = (role) => {
    setdisplayJobs(prev => 
      prev.filter(job => job.role === role)
    )
    if (filters.includes(role)) return
    else setFilters(prev => [...prev, role])
  }

  const handleLanguageFilter = (language) => {
    setdisplayJobs(prev => 
      prev.filter(job => job.languages.includes(language))
    )
    if (filters.includes(language)) return
    else setFilters(prev => [...prev, language])
  }
  
  const handleToolFilter = (tool) => {
    setdisplayJobs(prev => 
      prev.filter(job => job.tools.includes(tool))
    )
    if (filters.includes(tool)) return
    else setFilters(prev => [...prev, tool])
  }

  return (
    <div>
      {displayJobs.map((job, index) => (
        <div key={index} className={`JobListingCard ${job.featured? "featured" : ""}`}>
        <div className='JobListingCardLogo'>
          <img src={job.logo} alt={job.company}  />
        </div>
        <div className='JobListingCardDetails' key={index}>
          <div className='JobListingCardDetailsCompany'>
            <p className='Company'> {job.company} </p>
            <p className={`New ${job.new? "" : "hide"}`}> {job.new? "NEW!" : null} </p>
            <p className={`Featured ${job.featured? "" : "hide"}`}> {job.featured? "Featured" : null} </p>
          </div>
          <p className='Role'> {job.position}  </p>
          <div className='JobListingCardDetailsLocation'>
            <p> {job.postedAt} </p>
            <li> {job.role} </li>
            <li> {job.contract} </li>
          </div>
        </div>
        <div  className='JobListingCardSkills'>
          <div className='JobListingCardSkillsRoleLevel'>
            <p onClick={() => handleRoleFilter(job.role)}> {job.role} </p>
            <p> {job.level} </p>
          </div>
          <div className='JobListingCardSkillsLanguages'>
            {job.languages.map((language, index) => (
              <p key={index} onClick={() => handleLanguageFilter(language)}> {language} </p>
            ))}
          </div>
          <div className='JobListingCardSkillsTools'>
          <div className='JobListingCardSkillsTools'>
            {job.tools.map( (tool, index) => (
                <p key={index} onClick={() => handleToolFilter(tool)}>{job.tools? `${tool}` : null} </p>
            ))} 
          </div>
 
          </div>
        </div>
      </div>
      ))}
  </div>
  )
}
