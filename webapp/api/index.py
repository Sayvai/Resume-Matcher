from fastapi import FastAPI, Depends
import json

from .scripts.resume_processor import build_response
from .schemas.resume_processor import (
    ResumeProcessorResponse,
    Job,
    ResumeProcessorRequest,
)

app = FastAPI(
    title="Resume Matcher",
    description="APIs for Resume Matcher",
    version="0.1.0",
)


@app.post("/api/resume-processor", tags=["resume-processor"])
async def resume_processor(
    form_data: ResumeProcessorRequest = Depends(ResumeProcessorRequest.as_form),
) -> ResumeProcessorResponse:
    print(f"resume_processor() API request > form_data: {form_data}", "\n")

    # Get the file object
    resume_file = form_data.resume.file

    # Parse the jobs data as a JSON string
    jobs_data = json.loads(form_data.jobs)

    # Convert the jobs data to a list of Job objects
    jobs_list = [Job(**job) for job in jobs_data]

    # Build the response
    response = build_response(resume_file, jobs_list)

    return response
