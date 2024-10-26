'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BookOpen, Video, Heart, Info, Briefcase, ExternalLink } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from 'next/image';

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

const extracurriculars = [
  {
    name: "Youth Medical Association",
    focus: "Pre-med support, mentorship, medical skills training",
    link: "https://www.yma.institute/home"
  },
  {
    name: "Red Cross",
    focus: "Volunteer opportunities, blood drives, first aid training",
    link: "https://www.redcross.org"
  },
  {
    name: "Cancer Kids First",
    focus: "Supporting pediatric cancer patients, volunteer opportunities",
    link: "https://www.cancerkidsfirst.org"
  },
  {
    name: "Global Medical Brigades",
    focus: "Medical service trips, healthcare volunteering abroad",
    link: "https://medical.globalbrigades.org"
  },
  {
    name: "Doctors Without Borders",
    focus: "Awareness, advocacy, international healthcare volunteering",
    link: "https://www.doctorswithoutborders.org"
  },
  {
    name: "Medical Explorers",
    focus: "Healthcare career exploration, shadowing, hands-on activities",
    link: "https://www.hopkinsmedicine.org/all-childrens-hospital/academics/education/medical-explorers"
  },
  {
    name: "HOSA – Future Health Professionals",
    focus: "Medical competitions, leadership skills, conferences",
    link: "https://hosa.org"
  }
];

export default function Component() {
  const [selectedField, setSelectedField] = useState<MedicalField | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [comparedFields, setComparedFields] = useState<MedicalField[]>([]);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const filteredFields = medicalFields.filter(field =>
    field.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (fieldName: string) => {
    setFavorites(prev =>
      prev.includes(fieldName)
        ? prev.filter(name => name !== fieldName)
        : [...prev, fieldName]
    );
  };

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">MedPath</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><button onClick={() => setCurrentPage('home')} className="text-blue-600 hover:text-pink-500">Home</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="text-blue-600 hover:text-pink-500">About</button></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {currentPage === 'home' ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-blue-700 mb-4">Explore Medical Specialties</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Welcome to MedPath, your all-inclusive resource for learning about the various facets of healthcare and medicine.
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
                MedPath is designed to give you an engaging, easy-to-use way to learn about different medical specialties.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFields.map((field) => (
                <Card key={field.name} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-blue-600">{field.name}</CardTitle>
                    <CardDescription>{field.description.slice(0, 100)}...</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => setSelectedField(field)} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">About MedPath</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              MedPath is dedicated to helping aspiring medical professionals explore various specialties in the field of medicine.
              Our platform provides comprehensive information about different medical specialties, including key skills, average salaries, and educational resources.
            </p>
          </div>
        )}
      </main>

      <Dialog open={!!selectedField} onOpenChange={() => setSelectedField(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-600">{selectedField?.name}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <BookOpen className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="videos" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <Video className="mr-2 h-4 w-4" />
                Educational Videos
              </TabsTrigger>
              <TabsTrigger value="extracurriculars" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <Briefcase className="mr-2 h-4 w-4" />
                Extracurriculars
              </TabsTrigger>
            </TabsList>

```src/app/page.tsx
                // Start of Selection
                <TabsContent value="overview">
                  <ScrollArea className="h-[calc(100vh-380px)]">
                    {selectedField?.name === "Internal Medicine" && (
                      <div className="mb-6 flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/2">
                          <Image
                            src="/internalmedicine1.png"
                            alt="Internal Medicine Illustration 1"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                        <div className="md:w-1/2">
                          <Image
                            src="/internalmedicine2.png"
                            alt="Internal Medicine Illustration 2"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                    {selectedField?.name === "Surgery" && (
                      <div className="mb-6 flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/2">
                          <Image
                            src="/surgery1.png"
                            alt="Surgery Illustration 1"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                        <div className="md:w-1/2">
                          <Image
                            src="/surgery2.png"
                            alt="Surgery Illustration 2"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                    {selectedField?.name === "Pediatrics" && (
                      <div className="mb-6 flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/2">
                          <Image
                            src="/pediatrics1.png"
                            alt="Pediatrics Illustration 1"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                        <div className="md:w-1/2">
                          <Image
                            src="/pediatrics2.png"
                            alt="Pediatrics Illustration 2"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                    {selectedField?.name === "Radiology" && (
                      <div className="mb-6 flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/2">
                          <Image
                            src="/radiology1.png"
                            alt="Radiology Illustration 1"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                        <div className="md:w-1/2">
                          <Image
                            src="/radiology2.png"
                            alt="Radiology Illustration 2"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                    {selectedField?.name === "Cardiology" && (
                      <div className="mb-6 flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/2">
                          <Image
                            src="/Cardio1.png"
                            alt="Cardiology Illustration 1"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                        <div className="md:w-1/2">
                          <Image
                            src="/Cardio2.png"
                            alt="Cardiology Illustration 2"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                    {selectedField?.name === "Neurology" && (
                      <div className="mb-6 flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/2">
                          <Image
                            src="/Neuro1.png"
                            alt="Neurology Illustration 1"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                        <div className="md:w-1/2">
                          <Image
                            src="/Neuro2.png"
                            alt="Neurology Illustration 2"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                    {selectedField?.name === "OBGYN" && (
                      <div className="mb-6 flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/2">
                          <Image
                            src="/Obgyn1.png"
                            alt="OBGYN Illustration 1"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                        <div className="md:w-1/2">
                          <Image
                            src="/Obgyn2.png"
                            alt="Obgyn Illustration 2"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                    {selectedField?.name === "Emergency Medicine" && (
                      <div className="mb-6 flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/2">
                          <Image
                            src="/EmergencyMedicine1.png"
                            alt="Emergency Medicine Illustration 1"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                        <div className="md:w-1/2">
                          <Image
                            src="/EmergencyMedicine2.png"
                            alt="Emergency Medicine Illustration 2"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-md w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">{selectedField?.description}</p>
                {selectedField?.name === "Internal Medicine" && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                    <h4 className="text-lg font-semibold text-blue-700 mb-2">Key Areas of Focus:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>Preventive medicine and health promotion</li>
                      <li>Management of complex, chronic conditions</li>
                      <li>Diagnosis and treatment of acute illnesses</li>
                      <li>Coordination of care across multiple specialties</li>
                    </ul>
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Key Skills:</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedField?.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-pink-100 text-pink-800">{skill}</Badge>
                  ))}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold mr-2 text-blue-600">Average Salary:</h3>
                        <Info className="h-4 w-4 text-gray-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Based on national averages. May vary by location and experience.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="text-lg font-medium text-pink-600">{selectedField?.averageSalary}</p>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="videos">
              <ScrollArea className="h-[calc(100vh-380px)]">
                <ul className="space-y-4">
                  {selectedField?.videos.map((video, index) => (
                    <li key={index}>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-pink-500 flex items-center"
                      >
                        <Video className="mr-2 h-4 w-4" />
                        {video.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="extracurriculars">
              <ScrollArea className="h-[calc(100vh-380px)]">
                <ul className="space-y-4">
                  {extracurriculars.map((extracurricular, index) => (
                    <li key={index} className="border-b pb-4">
                      <h3 className="text-lg font-semibold text-blue-600">{extracurricular.name}</h3>
                      <p className="text-gray-600 mb-2">{extracurricular.focus}</p>
                      <a
                        href={extracurricular.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-600 flex items-center"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Learn More
                      </a>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
