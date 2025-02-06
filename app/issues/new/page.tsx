'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller} from 'react-hook-form';
import React, { useState } from 'react'
 import { useForm } from 'react-hook-form';
 import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueTracker } from '@/app/Validationschema';
import z from "zod";
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';



type Issueform = z.infer<typeof createIssueTracker>

 const NewIssuepage = () => {
    const {register, control, handleSubmit, formState:{errors}} = useForm<Issueform>({
      resolver: zodResolver(createIssueTracker)
    });
    const router= useRouter();
    const [error,setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    
    const onSubmit = handleSubmit(async(data) => {
      try {
        setSubmitting(true);
        await axios.post('/api/issues',data);
        router.push('/issues');
      } catch (error) {
        setSubmitting(false)
        setError('Unexpected shit error occured')
      }
})

    return (
   <div className='max-w-xl '>
    { error && <Callout.Root color='red' className='mb-5'>
        <Callout.Text>
            {error}
        </Callout.Text>
    </Callout.Root>
 }    <form 
    className="space-y-3" 
    onSubmit={onSubmit}>
        <TextField.Root placeholder='title' {...register('title')}>

    </TextField.Root>
 <ErrorMessage>{errors.title?.message}</ErrorMessage>
    <Controller name='description'
    control={control}
    render={({field}) => <SimpleMDE  placeholder="Description"{...field} /> }/>
    <ErrorMessage>{errors.description?.message}</ErrorMessage>
    <Button disabled={isSubmitting}>Submit New Issues {isSubmitting && <Spinner/>}</Button>
    </form>
   </div>
   )
 }
 
 export default NewIssuepage