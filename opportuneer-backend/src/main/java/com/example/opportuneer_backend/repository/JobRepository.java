package com.example.opportuneer_backend.repository;

import com.example.opportuneer_backend.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
	@Query("SELECT j FROM Job j WHERE " +
		       "(COALESCE(:title, '') = '' OR LOWER(j.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
		       "(COALESCE(:location, '') = '' OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
		       "(COALESCE(:jobType, '') = '' OR LOWER(j.jobType) LIKE LOWER(CONCAT('%', :jobType, '%'))) AND " +
		       "(COALESCE(:jobSite, '') = '' OR LOWER(j.jobSite) LIKE LOWER(CONCAT('%', :jobSite, '%'))) AND " +
		       "(COALESCE(:sector, '') = '' OR LOWER(j.sector) LIKE LOWER(CONCAT('%', :sector, '%')))")
		List<Job> searchJobs(@Param("title") String title,
		                     @Param("location") String location,
		                     @Param("jobType") String jobType,
		                     @Param("jobSite") String jobSite,
		                     @Param("sector") String sector);
	    List<Job> findByCompany(String companyName);
	
 
}
