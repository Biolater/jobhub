"use client";
import {
  JobBoardItem,
  JobBoardItemSkeleton,
  JobBoardSearchBar,
  JobBoardFilterDropdown,
} from "@/components/index";
import { useState, useEffect, useRef } from "react";
import { JobBoardItemTypes } from "@/types/jobBoardItem.types";
import toast from "react-hot-toast";
const JobBoard = () => {
  const [jobResults, setJobResults] = useState<JobBoardItemTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchbarValue, setSearchbarValue] = useState<string>("");
  const baseUrl = "https://jsearch.p.rapidapi.com/search?query=";
  const encodedSearchText = encodeURIComponent(searchbarValue);
  const filterOptions = [
    {
      title: "Date posted",
      options: ["Today", "Last 3 days", "Last 7 days", "Last 30 days"],
    },
  ];
  const num_pages = useRef(1);
  const url = `${baseUrl}${encodedSearchText}&num_pages=${num_pages.current}`;
  const mockData = [
    {
      job_id: "w5t3eq9SKhtEK-kGAAAAAA==",
      employer_name: "Reece USA",
      employer_logo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3AoGfUp8KCgyugkW89_iK-oXwaCuTX5bH2Kd&s=0",
      employer_website: null,
      employer_company_type: null,
      job_publisher: "LinkedIn",
      job_employment_type: "FULLTIME",
      job_title: "Python Developer",
      job_apply_link:
        "https://www.linkedin.com/jobs/view/python-developer-at-reece-usa-3938806517",
      job_apply_is_direct: false,
      job_apply_quality_score: 0.6241,
      apply_options: [
        {
          publisher: "LinkedIn",
          apply_link:
            "https://www.linkedin.com/jobs/view/python-developer-at-reece-usa-3938806517",
          is_direct: false,
        },
        {
          publisher: "Supply Industry Careers",
          apply_link:
            "https://supplyindustrycareers.com/job/sr-python-developer-data-scientists/",
          is_direct: false,
        },
      ],
      job_description:
        'The Reece Digital Solutions is growing! We’re looking for a Python Developer with experience in data science to work directly on our NLP based e-commerce search tool while working in coordination with our Innovation team building AI based prototypes. In this role, you\'ll become an integral part of a team thriving in a dynamic environment, crafting tools for the next generation of Reece employees and customers. Candidates successfully passing the initial two interview rounds will be required to complete a brief online coding test; please refrain from applying if you are unwilling to undertake the test.\n\nKey Responsibilities\n\n• Serve as the lead developer on our NLP-based e-commerce search tool.\n\n• Play an active role in solutioning and developing new digital prototypes.\n\n• Collaborate within a team environment to transform approved prototypes into production-ready tools.\n\n• Embrace a "student of the business" mindset, understanding the "why" behind all prototypes and productionized tools.\n\n• Think creatively and contribute innovative ideas for digital tools, enhancing both customer and team member experiences.\n\n• Write clean, modular, high-quality, high-performance, and maintainable code.\n\n• Mentor and develop less experienced Python developers to play an active role in search improvements and maintenance.\n\nTech Stack:\n• Python\n• Typscript\n• React\n• Docker\n• Lambda\n• AWS\n• EC2\n• Elasticsearch\n• Redis\n\nQualifications\n\n• Prior experience in e-commerce, parts of speech tagging, and elastic search preferred.\n\n• At least 3 years in professional software engineering or data science, specifically leveraging Python for the development of AI-driven/related tools.\n\n• Bachelor\'s degree in computer science, engineering, mathematics, physics, or similar technical disciplines.\n\n• Strong knowledge of data structures, algorithms, and architectural patterns.\n\n• Experience in developing practical applications rather than solely focusing on research and development.\n\n• Experience with cloud platforms.\n\n• Strong English communication skills.\n\nAll About You\n\n• You “get it” – when the “what” and “why” of projects are presented, the “how” is quickly obvious.\n\n• Prioritize MVP first, with the ability to thrive in a startup-style, fast-paced team.\n\n• Inclination towards identifying the simplest tech solutions for complex problems.\n\n• Motivated to tackle challenging real-world problems without obvious prior solutions.\n\n• Strong interpersonal skills with a passion for collaboration and teamwork, coupled with the ability to articulate technical vision to non-technical stakeholders.\n\n• Enthusiasm for delving into new technologies and quickly adapting to them.\n\n• Measure personal success by the success of your team.\n\n• Bias for action – self-starter, taking the lead without waiting for others.\n\n• Comfortable with ambiguity.\n\n• Fun, upbeat personality with a sense of humor.\n\nNice-to-haves\n\n• M.S. degree in Computer Science or related advanced degree preferred.\n\n• Previous startup experience.\n\n• Examples of projects led from start to finish as the lead Python developer.\n\n• Experience as a lead data scientist working on AI initiatives.\n\n• Understanding of automation and its optimization for business needs.\n\n• Exposure to big data and analytics would be advantageous.\n\n• Experience working in globally disbursed teams.\n\n• Bonus points for showing examples of projects you led that solved real-world problems (big or small!).',
      job_is_remote: false,
      job_posted_at_timestamp: 1717422696,
      job_posted_at_datetime_utc: "2024-06-03T13:51:36.000Z",
      job_city: "Dallas",
      job_state: "TX",
      job_country: "US",
      job_latitude: 32.776665,
      job_longitude: -96.79699,
      job_benefits: null,
      job_google_link:
        "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs&htidocid=w5t3eq9SKhtEK-kGAAAAAA%3D%3D#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=w5t3eq9SKhtEK-kGAAAAAA%3D%3D",
      job_offer_expiration_datetime_utc: "2024-07-03T13:51:36.000Z",
      job_offer_expiration_timestamp: 1720014696,
      job_required_experience: {
        no_experience_required: false,
        required_experience_in_months: null,
        experience_mentioned: true,
        experience_preferred: true,
      },
      job_required_skills: null,
      job_required_education: {
        postgraduate_degree: false,
        professional_certification: false,
        high_school: false,
        associates_degree: false,
        bachelors_degree: true,
        degree_mentioned: true,
        degree_preferred: true,
        professional_certification_mentioned: false,
      },
      job_experience_in_place_of_education: false,
      job_min_salary: 120000,
      job_max_salary: 125000,
      job_salary_currency: "USD",
      job_salary_period: "YEAR",
      job_highlights: {
        Qualifications: [
          "At least 3 years in professional software engineering or data science, specifically leveraging Python for the development of AI-driven/related tools",
          "Bachelor's degree in computer science, engineering, mathematics, physics, or similar technical disciplines",
          "Strong knowledge of data structures, algorithms, and architectural patterns",
          "Experience in developing practical applications rather than solely focusing on research and development",
          "Experience with cloud platforms",
          "Strong English communication skills",
          "Prioritize MVP first, with the ability to thrive in a startup-style, fast-paced team",
          "Inclination towards identifying the simplest tech solutions for complex problems",
          "Motivated to tackle challenging real-world problems without obvious prior solutions",
          "Strong interpersonal skills with a passion for collaboration and teamwork, coupled with the ability to articulate technical vision to non-technical stakeholders",
          "Enthusiasm for delving into new technologies and quickly adapting to them",
          "Measure personal success by the success of your team",
          "Bias for action – self-starter, taking the lead without waiting for others",
          "Comfortable with ambiguity",
          "Fun, upbeat personality with a sense of humor",
          "Previous startup experience",
          "Examples of projects led from start to finish as the lead Python developer",
          "Experience as a lead data scientist working on AI initiatives",
          "Understanding of automation and its optimization for business needs",
          "Exposure to big data and analytics would be advantageous",
          "Experience working in globally disbursed teams",
          "Bonus points for showing examples of projects you led that solved real-world problems (big or small!)",
        ],
        Responsibilities: [
          "In this role, you'll become an integral part of a team thriving in a dynamic environment, crafting tools for the next generation of Reece employees and customers",
          "Serve as the lead developer on our NLP-based e-commerce search tool",
          "Play an active role in solutioning and developing new digital prototypes",
          "Collaborate within a team environment to transform approved prototypes into production-ready tools",
          'Embrace a "student of the business" mindset, understanding the "why" behind all prototypes and productionized tools',
          "Think creatively and contribute innovative ideas for digital tools, enhancing both customer and team member experiences",
          "Write clean, modular, high-quality, high-performance, and maintainable code",
          "Mentor and develop less experienced Python developers to play an active role in search improvements and maintenance",
        ],
      },
      job_job_title: null,
      job_posting_language: "en",
      job_onet_soc: "15113200",
      job_onet_job_zone: "4",
      job_occupational_categories: null,
      job_naics_code: null,
      job_naics_name: null,
    },
    {
      job_id: "w5t3eq9SKhtEK-kGAAAAAA==",
      employer_name: "Reece USA",
      employer_logo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3AoGfUp8KCgyugkW89_iK-oXwaCuTX5bH2Kd&s=0",
      employer_website: null,
      employer_company_type: null,
      job_publisher: "LinkedIn",
      job_employment_type: "FULLTIME",
      job_title: "Python Developer",
      job_apply_link:
        "https://www.linkedin.com/jobs/view/python-developer-at-reece-usa-3938806517",
      job_apply_is_direct: false,
      job_apply_quality_score: 0.6241,
      apply_options: [
        {
          publisher: "LinkedIn",
          apply_link:
            "https://www.linkedin.com/jobs/view/python-developer-at-reece-usa-3938806517",
          is_direct: false,
        },
        {
          publisher: "Supply Industry Careers",
          apply_link:
            "https://supplyindustrycareers.com/job/sr-python-developer-data-scientists/",
          is_direct: false,
        },
      ],
      job_description:
        'The Reece Digital Solutions is growing! We’re looking for a Python Developer with experience in data science to work directly on our NLP based e-commerce search tool while working in coordination with our Innovation team building AI based prototypes. In this role, you\'ll become an integral part of a team thriving in a dynamic environment, crafting tools for the next generation of Reece employees and customers. Candidates successfully passing the initial two interview rounds will be required to complete a brief online coding test; please refrain from applying if you are unwilling to undertake the test.\n\nKey Responsibilities\n\n• Serve as the lead developer on our NLP-based e-commerce search tool.\n\n• Play an active role in solutioning and developing new digital prototypes.\n\n• Collaborate within a team environment to transform approved prototypes into production-ready tools.\n\n• Embrace a "student of the business" mindset, understanding the "why" behind all prototypes and productionized tools.\n\n• Think creatively and contribute innovative ideas for digital tools, enhancing both customer and team member experiences.\n\n• Write clean, modular, high-quality, high-performance, and maintainable code.\n\n• Mentor and develop less experienced Python developers to play an active role in search improvements and maintenance.\n\nTech Stack:\n• Python\n• Typscript\n• React\n• Docker\n• Lambda\n• AWS\n• EC2\n• Elasticsearch\n• Redis\n\nQualifications\n\n• Prior experience in e-commerce, parts of speech tagging, and elastic search preferred.\n\n• At least 3 years in professional software engineering or data science, specifically leveraging Python for the development of AI-driven/related tools.\n\n• Bachelor\'s degree in computer science, engineering, mathematics, physics, or similar technical disciplines.\n\n• Strong knowledge of data structures, algorithms, and architectural patterns.\n\n• Experience in developing practical applications rather than solely focusing on research and development.\n\n• Experience with cloud platforms.\n\n• Strong English communication skills.\n\nAll About You\n\n• You “get it” – when the “what” and “why” of projects are presented, the “how” is quickly obvious.\n\n• Prioritize MVP first, with the ability to thrive in a startup-style, fast-paced team.\n\n• Inclination towards identifying the simplest tech solutions for complex problems.\n\n• Motivated to tackle challenging real-world problems without obvious prior solutions.\n\n• Strong interpersonal skills with a passion for collaboration and teamwork, coupled with the ability to articulate technical vision to non-technical stakeholders.\n\n• Enthusiasm for delving into new technologies and quickly adapting to them.\n\n• Measure personal success by the success of your team.\n\n• Bias for action – self-starter, taking the lead without waiting for others.\n\n• Comfortable with ambiguity.\n\n• Fun, upbeat personality with a sense of humor.\n\nNice-to-haves\n\n• M.S. degree in Computer Science or related advanced degree preferred.\n\n• Previous startup experience.\n\n• Examples of projects led from start to finish as the lead Python developer.\n\n• Experience as a lead data scientist working on AI initiatives.\n\n• Understanding of automation and its optimization for business needs.\n\n• Exposure to big data and analytics would be advantageous.\n\n• Experience working in globally disbursed teams.\n\n• Bonus points for showing examples of projects you led that solved real-world problems (big or small!).',
      job_is_remote: false,
      job_posted_at_timestamp: 1717422696,
      job_posted_at_datetime_utc: "2024-06-03T13:51:36.000Z",
      job_city: "Dallas",
      job_state: "TX",
      job_country: "US",
      job_latitude: 32.776665,
      job_longitude: -96.79699,
      job_benefits: null,
      job_google_link:
        "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs&htidocid=w5t3eq9SKhtEK-kGAAAAAA%3D%3D#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=w5t3eq9SKhtEK-kGAAAAAA%3D%3D",
      job_offer_expiration_datetime_utc: "2024-07-03T13:51:36.000Z",
      job_offer_expiration_timestamp: 1720014696,
      job_required_experience: {
        no_experience_required: false,
        required_experience_in_months: null,
        experience_mentioned: true,
        experience_preferred: true,
      },
      job_required_skills: null,
      job_required_education: {
        postgraduate_degree: false,
        professional_certification: false,
        high_school: false,
        associates_degree: false,
        bachelors_degree: true,
        degree_mentioned: true,
        degree_preferred: true,
        professional_certification_mentioned: false,
      },
      job_experience_in_place_of_education: false,
      job_min_salary: 120000,
      job_max_salary: 125000,
      job_salary_currency: "USD",
      job_salary_period: "YEAR",
      job_highlights: {
        Qualifications: [
          "At least 3 years in professional software engineering or data science, specifically leveraging Python for the development of AI-driven/related tools",
          "Bachelor's degree in computer science, engineering, mathematics, physics, or similar technical disciplines",
          "Strong knowledge of data structures, algorithms, and architectural patterns",
          "Experience in developing practical applications rather than solely focusing on research and development",
          "Experience with cloud platforms",
          "Strong English communication skills",
          "Prioritize MVP first, with the ability to thrive in a startup-style, fast-paced team",
          "Inclination towards identifying the simplest tech solutions for complex problems",
          "Motivated to tackle challenging real-world problems without obvious prior solutions",
          "Strong interpersonal skills with a passion for collaboration and teamwork, coupled with the ability to articulate technical vision to non-technical stakeholders",
          "Enthusiasm for delving into new technologies and quickly adapting to them",
          "Measure personal success by the success of your team",
          "Bias for action – self-starter, taking the lead without waiting for others",
          "Comfortable with ambiguity",
          "Fun, upbeat personality with a sense of humor",
          "Previous startup experience",
          "Examples of projects led from start to finish as the lead Python developer",
          "Experience as a lead data scientist working on AI initiatives",
          "Understanding of automation and its optimization for business needs",
          "Exposure to big data and analytics would be advantageous",
          "Experience working in globally disbursed teams",
          "Bonus points for showing examples of projects you led that solved real-world problems (big or small!)",
        ],
        Responsibilities: [
          "In this role, you'll become an integral part of a team thriving in a dynamic environment, crafting tools for the next generation of Reece employees and customers",
          "Serve as the lead developer on our NLP-based e-commerce search tool",
          "Play an active role in solutioning and developing new digital prototypes",
          "Collaborate within a team environment to transform approved prototypes into production-ready tools",
          'Embrace a "student of the business" mindset, understanding the "why" behind all prototypes and productionized tools',
          "Think creatively and contribute innovative ideas for digital tools, enhancing both customer and team member experiences",
          "Write clean, modular, high-quality, high-performance, and maintainable code",
          "Mentor and develop less experienced Python developers to play an active role in search improvements and maintenance",
        ],
      },
      job_job_title: null,
      job_posting_language: "en",
      job_onet_soc: "15113200",
      job_onet_job_zone: "4",
      job_occupational_categories: null,
      job_naics_code: null,
      job_naics_name: null,
    },
    {
      job_id: "w5t3eq9SKhtEK-kGAAAAAA==",
      employer_name: "Reece USA",
      employer_logo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk3AoGfUp8KCgyugkW89_iK-oXwaCuTX5bH2Kd&s=0",
      employer_website: null,
      employer_company_type: null,
      job_publisher: "LinkedIn",
      job_employment_type: "FULLTIME",
      job_title: "Python Developer",
      job_apply_link:
        "https://www.linkedin.com/jobs/view/python-developer-at-reece-usa-3938806517",
      job_apply_is_direct: false,
      job_apply_quality_score: 0.6241,
      apply_options: [
        {
          publisher: "LinkedIn",
          apply_link:
            "https://www.linkedin.com/jobs/view/python-developer-at-reece-usa-3938806517",
          is_direct: false,
        },
        {
          publisher: "Supply Industry Careers",
          apply_link:
            "https://supplyindustrycareers.com/job/sr-python-developer-data-scientists/",
          is_direct: false,
        },
      ],
      job_description:
        'The Reece Digital Solutions is growing! We’re looking for a Python Developer with experience in data science to work directly on our NLP based e-commerce search tool while working in coordination with our Innovation team building AI based prototypes. In this role, you\'ll become an integral part of a team thriving in a dynamic environment, crafting tools for the next generation of Reece employees and customers. Candidates successfully passing the initial two interview rounds will be required to complete a brief online coding test; please refrain from applying if you are unwilling to undertake the test.\n\nKey Responsibilities\n\n• Serve as the lead developer on our NLP-based e-commerce search tool.\n\n• Play an active role in solutioning and developing new digital prototypes.\n\n• Collaborate within a team environment to transform approved prototypes into production-ready tools.\n\n• Embrace a "student of the business" mindset, understanding the "why" behind all prototypes and productionized tools.\n\n• Think creatively and contribute innovative ideas for digital tools, enhancing both customer and team member experiences.\n\n• Write clean, modular, high-quality, high-performance, and maintainable code.\n\n• Mentor and develop less experienced Python developers to play an active role in search improvements and maintenance.\n\nTech Stack:\n• Python\n• Typscript\n• React\n• Docker\n• Lambda\n• AWS\n• EC2\n• Elasticsearch\n• Redis\n\nQualifications\n\n• Prior experience in e-commerce, parts of speech tagging, and elastic search preferred.\n\n• At least 3 years in professional software engineering or data science, specifically leveraging Python for the development of AI-driven/related tools.\n\n• Bachelor\'s degree in computer science, engineering, mathematics, physics, or similar technical disciplines.\n\n• Strong knowledge of data structures, algorithms, and architectural patterns.\n\n• Experience in developing practical applications rather than solely focusing on research and development.\n\n• Experience with cloud platforms.\n\n• Strong English communication skills.\n\nAll About You\n\n• You “get it” – when the “what” and “why” of projects are presented, the “how” is quickly obvious.\n\n• Prioritize MVP first, with the ability to thrive in a startup-style, fast-paced team.\n\n• Inclination towards identifying the simplest tech solutions for complex problems.\n\n• Motivated to tackle challenging real-world problems without obvious prior solutions.\n\n• Strong interpersonal skills with a passion for collaboration and teamwork, coupled with the ability to articulate technical vision to non-technical stakeholders.\n\n• Enthusiasm for delving into new technologies and quickly adapting to them.\n\n• Measure personal success by the success of your team.\n\n• Bias for action – self-starter, taking the lead without waiting for others.\n\n• Comfortable with ambiguity.\n\n• Fun, upbeat personality with a sense of humor.\n\nNice-to-haves\n\n• M.S. degree in Computer Science or related advanced degree preferred.\n\n• Previous startup experience.\n\n• Examples of projects led from start to finish as the lead Python developer.\n\n• Experience as a lead data scientist working on AI initiatives.\n\n• Understanding of automation and its optimization for business needs.\n\n• Exposure to big data and analytics would be advantageous.\n\n• Experience working in globally disbursed teams.\n\n• Bonus points for showing examples of projects you led that solved real-world problems (big or small!).',
      job_is_remote: false,
      job_posted_at_timestamp: 1717422696,
      job_posted_at_datetime_utc: "2024-06-03T13:51:36.000Z",
      job_city: "Dallas",
      job_state: "TX",
      job_country: "US",
      job_latitude: 32.776665,
      job_longitude: -96.79699,
      job_benefits: null,
      job_google_link:
        "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=python+developer+in+texas,+usa&start=0&ibp=htl;jobs&htidocid=w5t3eq9SKhtEK-kGAAAAAA%3D%3D#fpstate=tldetail&htivrt=jobs&htiq=python+developer+in+texas,+usa&htidocid=w5t3eq9SKhtEK-kGAAAAAA%3D%3D",
      job_offer_expiration_datetime_utc: "2024-07-03T13:51:36.000Z",
      job_offer_expiration_timestamp: 1720014696,
      job_required_experience: {
        no_experience_required: false,
        required_experience_in_months: null,
        experience_mentioned: true,
        experience_preferred: true,
      },
      job_required_skills: null,
      job_required_education: {
        postgraduate_degree: false,
        professional_certification: false,
        high_school: false,
        associates_degree: false,
        bachelors_degree: true,
        degree_mentioned: true,
        degree_preferred: true,
        professional_certification_mentioned: false,
      },
      job_experience_in_place_of_education: false,
      job_min_salary: 120000,
      job_max_salary: 125000,
      job_salary_currency: "USD",
      job_salary_period: "YEAR",
      job_highlights: {
        Qualifications: [
          "At least 3 years in professional software engineering or data science, specifically leveraging Python for the development of AI-driven/related tools",
          "Bachelor's degree in computer science, engineering, mathematics, physics, or similar technical disciplines",
          "Strong knowledge of data structures, algorithms, and architectural patterns",
          "Experience in developing practical applications rather than solely focusing on research and development",
          "Experience with cloud platforms",
          "Strong English communication skills",
          "Prioritize MVP first, with the ability to thrive in a startup-style, fast-paced team",
          "Inclination towards identifying the simplest tech solutions for complex problems",
          "Motivated to tackle challenging real-world problems without obvious prior solutions",
          "Strong interpersonal skills with a passion for collaboration and teamwork, coupled with the ability to articulate technical vision to non-technical stakeholders",
          "Enthusiasm for delving into new technologies and quickly adapting to them",
          "Measure personal success by the success of your team",
          "Bias for action – self-starter, taking the lead without waiting for others",
          "Comfortable with ambiguity",
          "Fun, upbeat personality with a sense of humor",
          "Previous startup experience",
          "Examples of projects led from start to finish as the lead Python developer",
          "Experience as a lead data scientist working on AI initiatives",
          "Understanding of automation and its optimization for business needs",
          "Exposure to big data and analytics would be advantageous",
          "Experience working in globally disbursed teams",
          "Bonus points for showing examples of projects you led that solved real-world problems (big or small!)",
        ],
        Responsibilities: [
          "In this role, you'll become an integral part of a team thriving in a dynamic environment, crafting tools for the next generation of Reece employees and customers",
          "Serve as the lead developer on our NLP-based e-commerce search tool",
          "Play an active role in solutioning and developing new digital prototypes",
          "Collaborate within a team environment to transform approved prototypes into production-ready tools",
          'Embrace a "student of the business" mindset, understanding the "why" behind all prototypes and productionized tools',
          "Think creatively and contribute innovative ideas for digital tools, enhancing both customer and team member experiences",
          "Write clean, modular, high-quality, high-performance, and maintainable code",
          "Mentor and develop less experienced Python developers to play an active role in search improvements and maintenance",
        ],
      },
      job_job_title: null,
      job_posting_language: "en",
      job_onet_soc: "15113200",
      job_onet_job_zone: "4",
      job_occupational_categories: null,
      job_naics_code: null,
      job_naics_name: null,
    },
  ];
  useEffect(() => {
    setJobResults(mockData);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);
  const handleLoadMore = () => {
    setLoading(true);
    num_pages.current += 1;
    fetchJobs();
  };
  const fetchJobs = async () => {
    const rapidApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    const rapidApiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidApiKey || "",
        "x-rapidapi-host": rapidApiHost || "",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.status === "ERROR") {
        throw new Error(result.error.message);
      }
      setJobResults(result?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);

      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <main className="jobBoard p-4 sm:px-10 md:px-20 lg:px-40 max-w-[1200px] mx-auto">
      <h1 className="text-center mb-4 text-2xl font-semibold text-whitish">
        Welcome to the Job Board
      </h1>
      <JobBoardSearchBar
        loading={loading}
        onSearch={fetchJobs}
        searchBarValue={searchbarValue}
        onSearchbarChange={(value: string) => setSearchbarValue(value)}
      />
      <div className="filter-options flex items-center gap-2 mb-4">
        {filterOptions.map((filterOption, idx) => (
          <JobBoardFilterDropdown title={filterOption.title} />
        ))}
      </div>
      <div className="jobBoard__items flex flex-col gap-4">
        {loading &&
          Array.from({ length: 10 }).map((_, index: number) => (
            <JobBoardItemSkeleton key={index} />
          ))}
        {!loading &&
          jobResults?.length > 0 &&
          jobResults.map((job: JobBoardItemTypes, index: number) => (
            // @ts-ignore
            <JobBoardItem
              key={index}
              logo={
                job?.employer_logo ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKVFUS0E_FUcfm8FcqIjCEPHAUu2_rqm7Qtg&s"
              }
              job_id={job.job_id}
              employer_name={job.employer_name}
              job_city={job.job_city}
              job_state={job.job_state}
              job_title={job.job_title}
            />
          ))}
        {jobResults?.length === 0 && !loading && (
          <div className="text-center text-2xl my-2 text-whitish">
            No results found
          </div>
        )}
      </div>
      {!loading && jobResults?.length >= 10 && (
        <div className="loadMoreButton flex items-center justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="bg-secondary transition-all duration-200 hover:scale-105 active:scale-90 p-2 rounded-lg font-medium text-whitish"
          >
            Load more
          </button>
        </div>
      )}
    </main>
  );
};

export default JobBoard;
