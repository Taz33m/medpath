'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronRight, BookOpen, Video, Heart, Info } from 'lucide-react'

const medicalFields = [
  {
    name: "Internal Medicine",
    description: "Internal medicine focuses on the diagnosis, prevention, and treatment of adult illnesses. Internists treat a variety of illnesses affecting internal organs such as the lungs, kidney, heart, and digestive tract. They often handle both acute diseases like appendicitis and strep throat, and chronic conditions like diabetes, high blood pressure, and heart disease. When more life-threatening illnesses emerge, internists interact with other doctors to offer comprehensive care, frequently serving as patients' primary care physicians. Instead of concentrating on a single organ system or illness, their practice focuses on knowing the patient as a whole.",
    videos: [
      { title: "So You Want to Be an INTERNAL MEDICINE DOCTOR [Ep. 19]", url: "https://www.youtube.com/watch?v=dRM3Cy5CQI4" },
      { title: "8 Internal Medicine Subspecialties Explained", url: "https://www.youtube.com/watch?v=kvu6-Vxz3OE" }
    ],
    skills: ["Diagnostic reasoning", "Patient communication", "Chronic disease management"],
    averageSalary: "$251,000"
  },
  {
    name: "Surgery",
    description: "Surgery is a branch of medicine that uses surgical techniques to treat illnesses, wounds, and abnormalities. From simple operations to life-saving surgeries, surgeons carry out a wide range of techniques and processes. This field requires extensive training, precision, and quick decision-making. Surgeons can specialize in fields like general surgery, neurosurgery, or cardiovascular surgery. Surgery is a very active and challenging area of medicine, often involving collaboration with other medical specialists to provide comprehensive patient care.",
    videos: [
      { title: "Minds of Medicine: Beating Cancer with Surgery", url: "https://www.youtube.com/watch?v=KCDbt1iWVb4" },
      { title: "36 Surgical Subspecialties | Which Is Right For You?", url: "https://www.youtube.com/watch?v=N69oIZO5Bj8" }
    ],
    skills: ["Manual dexterity", "Stress management", "Critical thinking"],
    averageSalary: "$409,000"
  },
  {
    name: "Pediatrics",
    description: "Pediatrics is a branch of medicine that focuses on treating the physical, mental, and social health of newborns, children, and teenagers. Pediatricians treat a broad spectrum of conditions, from common juvenile illnesses to more complex developmental and genetic abnormalities. They are essential in preventative care, counseling families on immunizations, diet, and healthy development. Pediatricians often collaborate closely with parents and other experts to provide comprehensive care for young patients.",
    videos: [
      { title: "MD/DNB in Pediatrics - Why and who should consider Pediatrics as a branch!", url: "https://www.youtube.com/watch?v=35UKhhyxCyU" },
      { title: "A Day in the Life of a Pediatrician | Indeed", url: "https://www.youtube.com/watch?v=_c8WZZYk85o" }
    ],
    skills: ["Child-friendly communication", "Developmental assessment", "Vaccination knowledge"],
    averageSalary: "$232,000"
  },
  {
    name: "Radiology",
    description: "Radiology is a branch of medicine that focuses on creating and interpreting imaging technologies like CT, MRI, ultrasound, and X-rays to diagnose and treat illnesses. Radiologists are experts in analyzing medical images to identify and track disorders of internal organs, fractures, and cancer. They collaborate closely with other medical professionals to inform treatment strategies based on imaging results. Radiologists may also perform image-guided biopsies and therapies. This discipline requires keen analytical abilities and careful attention to detail.",
    videos: [
      { title: "Is Radiology your branch ? | Experts talk | Career Guidance - Ep 01 | Dr.Sushen Neuroradiologist |", url: "https://www.youtube.com/watch?v=00XyVkYKboI" },
      { title: "So You Want to Be a RADIOLOGIST [Ep. 16]", url: "https://www.youtube.com/watch?v=DzpjRBLnKEM" }
    ],
    skills: ["Image interpretation", "Technology proficiency", "Attention to detail"],
    averageSalary: "$427,000"
  },
  {
    name: "Cardiology",
    description: "Cardiology focuses on diagnosing and treating conditions affecting the heart and blood vessels. Cardiologists treat diseases like heart disease, hypertension, and heart failure. They evaluate heart function using tests like EKGs, echocardiograms, and stress testing. Cardiologists also help patients prevent heart issues by recommending lifestyle modifications and medications. Some cardiologists specialize further in fields such as electrophysiology or interventional cardiology. This specialty requires strong knowledge of the cardiovascular system and a dedication to long-term patient care.",
    videos: [
      { title: "So You Want to Be a CARDIOLOGIST [Ep. 3]", url: "https://www.youtube.com/watch?v=bzW1ynK_J28" },
      { title: "73 Questions with a Cardiologist | ND MD", url: "https://www.youtube.com/watch?v=5mFkcn5eE18" }
    ],
    skills: ["ECG interpretation", "Cardiovascular physiology", "Interventional procedures"],
    averageSalary: "$438,000"
  },
  {
    name: "Neurology",
    description: "Neurology is dedicated to the diagnosis and treatment of conditions affecting the neurological system, including the brain, spinal cord, and peripheral nerves. Neurologists treat disorders such as multiple sclerosis, epilepsy, strokes, Parkinson's disease, and migraines. This discipline requires a thorough understanding of intricate neurological circuits and the ability to interpret complex diagnostic procedures like MRIs and EEGs. Neurologists often collaborate closely with other specialists to provide comprehensive care for patients with neurological disorders.",
    videos: [
      { title: "So You Want to Be a NEUROLOGIST [Ep. 20]", url: "https://www.youtube.com/watch?v=Z1oCBpuTpsY" },
      { title: "73 Questions with a Neurologist | ND MD", url: "https://www.youtube.com/watch?v=PLvFANu2G2A" },
      { title: "73 Questions with a Neurosurgeon | ND MD", url: "https://www.youtube.com/watch?v=NTnT5v_Tb_E" }
    ],
    skills: ["Neurological examination", "Cognitive assessment", "Electrophysiology"],
    averageSalary: "$280,000"
  },
  {
    name: "OBGYN",
    description: "OB/GYN focuses on women's reproductive health, including pregnancy, childbirth, and problems of the female reproductive system. Obstetricians offer care throughout pregnancy, labor, and delivery, while gynecologists manage routine examinations, screenings, and treatment of reproductive health concerns. This specialty requires strong clinical abilities and a caring attitude, as OB/GYNs often establish enduring relationships with patients at multiple stages of life.",
    videos: [
      { title: "5 things I wish I knew before becoming an OBGYN", url: "https://www.youtube.com/watch?v=Aa0vs9-_ZrM" },
      { title: "VLOG: Day in the Life of an OBGYN | 24hr Call Shift!", url: "https://www.youtube.com/watch?v=lK0jV7E151E" },
      { title: "So You Want to Be an OB/GYN [Ep. 22]", url: "https://www.youtube.com/watch?v=8w5jkkLxt6k" }
    ],
    skills: ["Obstetrical procedures", "Gynecological surgeries", "Prenatal care"],
    averageSalary: "$312,000"
  },
  {
    name: "Emergency Medicine",
    description: "Emergency medicine is devoted to the efficient diagnosis and management of severe illnesses and injuries that need rapid medical intervention. Emergency physicians operate in high-stress settings, including hospital emergency rooms, where they must act quickly to stabilize patients in danger of dying. They handle a broad range of cases from serious infections and medical emergencies to trauma and cardiac problems, providing timely and efficient care.",
    videos: [
      { title: "73 Questions with an Emergency Medicine Resident ft. See The Med Life | ND MD", url: "https://www.youtube.com/watch?v=scjW2IEIKvQ" },
      { title: "So You Want to Be an EMERGENCY MEDICINE DOCTOR [Ep. 9]", url: "https://www.youtube.com/watch?v=RaWl6-l-t4g" }
    ],
    skills: ["Rapid assessment", "Trauma management", "Multitasking"],
    averageSalary: "$353,000"
  },
  {
    name: "Anesthesiology",
    description: "Anesthesiology is concerned with managing pain during and after surgical procedures and administering anesthetics. Anesthesiologists are in charge of monitoring patients' vital signs, managing their discomfort, and ensuring their safety during and after surgery. They play a crucial role in preoperative evaluations and postoperative treatment, handling any anesthesia-related issues. This specialty requires a rigorous understanding of pharmacology, physiology, and patient care.",
    videos: [
      { title: "73 Questions with an Anesthesiology Resident | ND MD", url: "https://www.youtube.com/watch?v=1San_dtqdT0" },
      { title: "So You Want to Be an ANESTHESIOLOGIST [Ep. 12]", url: "https://www.youtube.com/watch?v=z8h1mRqI3_I" }
    ],
    skills: ["Airway management", "Pharmacology expertise", "Critical care"],
    averageSalary: "$405,000"
  },
  {
    name: "Psychiatry",
    description: "Psychiatry focuses on the diagnosis, treatment, and prevention of mental illnesses and emotional problems. Psychiatrists may employ a combination of psychotherapy, medication, and other interventions to treat patients with illnesses like depression, bipolar disorder, schizophrenia, and anxiety. They monitor patients' mental health through exams and interviews. This specialty emphasizes treating mental health holistically, considering social, psychological, and biological factors that might affect patients throughout their lives.",
    videos: [
      { title: "73 Questions with a Psychiatry Resident ft. Jake Goodman MD | ND MD", url: "https://www.youtube.com/watch?v=68np-Fp92P4" },
      { title: "Why Did I Become A Psychiatrist? - My Medical School & Residency Journey", url: "https://www.youtube.com/watch?v=6yjvwXlZ6lo" }
    ],
    skills: ["Psychotherapy techniques", "Medication management", "Empathetic listening"],
    averageSalary: "$275,000"
  },
  {
    name: "Medical Extracurriculars",
    description: "Medical extracurriculars are activities outside of regular medical curriculum that enhance a student's medical knowledge, skills, and experience. These can include research projects, volunteer work in healthcare settings, medical missions, and participation in medical student organizations. While not a medical specialty, extracurriculars are crucial for aspiring medical professionals to gain hands-on experience and develop important skills.",
    videos: [
      { title: "Medical School Extracurriculars that Actually Matter", url: "https://www.youtube.com/watch?v=example23" },
      { title: "5 BEST Medical School Extracurriculars", url: "https://www.youtube.com/watch?v=example24" }
    ],
    skills: ["Time management", "Leadership", "Research skills"],
    averageSalary: "N/A"
  }
];

// Add this type definition
type MedicalField = typeof medicalFields[0];

export default function Component() {
  const [selectedField, setSelectedField] = useState(medicalFields[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [compareMode, setCompareMode] = useState(false)
  const [comparedFields, setComparedFields] = useState<MedicalField[]>([])
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const filteredFields = medicalFields.filter(field =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleFavorite = (fieldName: string) => {
    setFavorites(prev =>
      prev.includes(fieldName)
        ? prev.filter(name => name !== fieldName)
        : [...prev, fieldName]
    )
  }

  const toggleCompare = (field: MedicalField) => {
    if (compareMode) {
      setComparedFields(prev => {
        if (prev.some(f => f.name === field.name)) {
          return prev.filter(f => f.name !== field.name);
        } else if (prev.length < 2) {
          return [...prev, field];
        }
        return prev;
      });
    } else {
      setSelectedField(field);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">MedPath</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><button onClick={() => setCurrentPage('home')} className="text-gray-600 hover:text-gray-900">Home</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="text-gray-600 hover:text-gray-900">About</button></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {currentPage === 'home' ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Explore Medical Specialties</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Welcome to MedPath, your all-inclusive resource for learning about the various facets of healthcare and medicine. Whether you&apos;re a student hoping to pursue a career in medicine or you&apos;re just interested in the various specialties that are offered, you&apos;re in the ideal place!
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
                MedPath is designed to give you an engaging, easy-to-use way to learn about different medical specialties. You&apos;ll find information on several specialties along with tools and instructional videos that will walk you through each career. Just click on any of the fields below to learn more about specific career choices, necessary skills, and practical applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="md:col-span-1 h-[calc(100vh-200px)] overflow-hidden">
                <CardContent className="p-4">
                  <div className="mb-4">
                    <Input
                      type="text"
                      placeholder="Search medical fields..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="mb-4 flex justify-between items-center space-x-2">
                    <Button
                      onClick={() => {
                        setCompareMode(!compareMode);
                        if (compareMode) {
                          setComparedFields([]);
                        }
                      }}
                      variant={compareMode ? "default" : "outline"}
                    >
                      {compareMode ? "Exit Compare" : "Compare Fields"}
                    </Button>
                    {compareMode && (
                      <span className="text-sm text-gray-500 flex-shrink-0">
                        Select up to 2 fields
                      </span>
                    )}
                  </div>
                  <ScrollArea className="h-[calc(100vh-340px)]">
                    {filteredFields.map((field) => (
                      <Button
                        key={field.name}
                        onClick={() => toggleCompare(field)}
                        variant={
                          compareMode
                            ? comparedFields.some(f => f.name === field.name)
                              ? "default"
                              : "outline"
                            : selectedField.name === field.name
                            ? "default"
                            : "ghost"
                        }
                        className="w-full justify-start mb-2 relative"
                        disabled={compareMode && comparedFields.length === 2 && !comparedFields.some(f => f.name === field.name)}
                      >
                        <ChevronRight className="mr-2 h-4 w-4" />
                        {field.name}
                        <Heart
                          className={`absolute right-2 h-4 w-4 ${
                            favorites.includes(field.name) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(field.name)
                          }}
                        />
                      </Button>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="md:col-span-3 h-[calc(100vh-200px)] overflow-hidden">
                <CardContent className="p-6">
                  {compareMode ? (
                    <div>
                      <h2 className="text-3xl font-bold mb-4">Field Comparison</h2>
                      {comparedFields.length === 0 ? (
                        <p className="text-lg text-gray-600">Select up to two fields to compare.</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {comparedFields.map((field: typeof medicalFields[0]) => (
                            <div key={field.name} className="border p-4 rounded-lg">
                              <h3 className="text-xl font-semibold mb-2">{field.name}</h3>
                              <p className="text-gray-600 mb-2">{field.description}</p>
                              <h4 className="font-semibold mt-4 mb-2">Key Skills:</h4>
                              <ul className="list-disc pl-5 mb-2">
                                {field.skills.map((skill, index) => (
                                  <li key={index}>{skill}</li>
                                ))}
                              </ul>
                              <p className="font-semibold">Average Salary: {field.averageSalary}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <h2 className="text-3xl font-bold mb-4">{selectedField.name}</h2>
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList>
                          <TabsTrigger value="overview">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Overview
                          </TabsTrigger>
                          <TabsTrigger value="videos">
                            <Video className="mr-2 h-4 w-4" />
                            Educational Videos
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                          <ScrollArea className="h-[calc(100vh-380px)]">
                            <p className="text-gray-600 text-lg leading-relaxed mb-4">{selectedField.description}</p>
                            <h3 className="text-xl font-semibold mb-2">Key Skills:</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {selectedField.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center">
                                    <h3 className="text-xl font-semibold mr-2">Average Salary:</h3>
                                    <Info className="h-4 w-4 text-gray-400" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Based on national averages. May vary by location and experience.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <p className="text-lg font-medium text-green-600">{selectedField.averageSalary}</p>
                          </ScrollArea>
                        </TabsContent>
                        <TabsContent value="videos">
                          <ScrollArea className="h-[calc(100vh-380px)]">
                            <ul className="space-y-4">
                              {selectedField.videos.map((video, index) => (
                                <li key={index}>
                                  <a
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline flex items-center"
                                  >
                                    <Video className="mr-2 h-4 w-4" />
                                    {video.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </ScrollArea>
                        </TabsContent>
                      </Tabs>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-4">About MedPath</h2>
            <p className="text-lg text-gray-600">
              MedPath is your comprehensive resource for exploring various medical specialties. 
              We aim to provide students and aspiring medical professionals with detailed information 
              about different fields in medicine, helping them make informed decisions about their career paths.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
