import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { GraduationCap, Pencil, TrashIcon } from 'lucide-react'



interface Education {
  degree: string,
  intitution: string,
  year: string
}

const TeacherEducation = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [educationlist, setEducationlist] = useState<Education[]>([]);
  const [edu, setEdu] = useState<Education>({degree: "", intitution: "", year: ""})
  const [add, setIsAdd] = useState(false)
  const [edit, setEdit] = useState<number | null>(null)
  const handleAdd = ()=> {
    setIsAdd(true);
  }
  const cancelhandle = ()=> {
    setIsAdd(false)
  }

  const handleDelete = (indextoDelete: number) => {
      const updatedList = educationlist.filter((_,index) => index !== indextoDelete);

      setEducationlist(updatedList)
      localStorage.setItem("educationData", JSON.stringify(updatedList));
  }
 
  const handleEdit = (index: number)=>{
    setEdu(educationlist[index]) //load value into input
    setEdit(index)  //remember which index to be edited
    setIsAdd(true)  //opens the form
  }

const handleSubmit = async (e: React.FormEvent) => {    
 e.preventDefault();
   if(!edu.degree || !edu.intitution || !edu.year){
    alert("Please fill all the fields")
    return 
   }
 setIsLoading(true);
 let updatedList = []


   if(edit !== null){
      updatedList = educationlist.map((item, i)=> i === edit ? edu: item);
   }
   else{
    
 const updatelist = [...educationlist, edu]

  setEducationlist(updatelist)
 localStorage.setItem("educationData", JSON.stringify(updatelist));
setEdu({degree: "", intitution: "", year: ""});
setIsAdd(false)
}
   }

 useEffect(()=>{
   const savedData = localStorage.getItem("educationData");
   if(savedData) {
     setEducationlist(JSON.parse(savedData));
   }
   
},[])

{isLoading && 

    <div>
      Loading...
    </div>
}

const isActive = add
  return (
    <div>
        <Card className="w-full overflow-hidden ">
      <CardHeader>
        <CardTitle className=' flex gap-2 mt-5'>
          <GraduationCap className='w-5 h-5'/>
          <h2 className='text-xl font-semibold'>Education</h2>
          </CardTitle>
        <CardAction>
          {!isActive && (
             <Button className='border-2 mt-5 ' onClick={handleAdd} >ADD</Button>
          )}
        </CardAction>
      </CardHeader>
      <div className='w-full mb-5 flex-col flex gap-5 p-4 '>
          {educationlist.length === 0 ? (<p className='text-lg flex item-center justify-center'>No data added Yet</p>) : 
          (
            educationlist.map((item, index)=> (
              <div key={index} className='flex flex-row border-red-300 cursor-pointer border-3 hover:border-red-500 border-t-0 border-b-0 border-r-0 gap-2'>
              
               <div className='flex flex-col gap-2  w-1/2'>
                 <p className='font-semibold md:lg:text-lg ml-5'>{item.degree} </p>
                <p className='text-gray-500 ml-5'>{item.intitution}</p>
                <p className='text-gray-400 ml-5'>{item.year}</p>
               </div>

                 <div className=' flex gap-5  w-1/2'>
                  <button className='ml-35 rounded-xl hover:text-blue-500' onClick={()=>handleEdit(index)}>
                    <Pencil/>
                  </button>

                  <button className=' rounded-xl hover:text-red-500' onClick={()=> handleDelete(index)}> 
                    <TrashIcon/>
                  </button>
                 </div>

              </div>
            ))
          )
          }
      </div>
      {isActive &&(
        <div className='flex  p-5 '>
        <CardContent className='border-1 border-blue-500 w-full p-5 bg-gray-100 rounded-xl'>
          <h1 className='lg:md:text-lg font-semibold'>New Entry</h1>
        <form className='mt-5'>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Degree / Certificate</Label>
              <Input
                value={edu.degree}
                onChange={(e) => setEdu({...edu, degree: e.target.value})}
                placeholder="e.g Phd in Applied Mathematics"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label >Institution</Label>
              </div>
              <Input
              placeholder='e.g NIT Kanpur'
               value={edu.intitution}
               onChange={(e)=> setEdu({...edu, intitution: e.target.value})}
               required />
            </div>

             <div className="grid gap-2">
              <div className="flex items-center">
                <Label >Year</Label>
              </div>
              <Input
               value={edu.year}
               onChange={(e)=> setEdu({...edu, year: e.target.value})}
               placeholder='e.g 2020' required />
            </div>
          </div>
        </form>
      </CardContent>
      </div>
      )}
      
      <CardFooter className="flex-col gap-2">
       {isActive &&(
        <div className='flex gap-5 justify-center items-center '> 
           <Button type="submit" onClick={handleSubmit}  className="w-full bg-red-500 text-white cursor-pointer hover:scale-103">
          Save
        </Button>
        <Button variant="outline" onClick={cancelhandle} className="w-full hover:bg-black hover:text-white cursor-pointer ">
          Cancel
        </Button>
        </div>
       )}
      </CardFooter>

    </Card>
    </div>
  )
}

export default TeacherEducation