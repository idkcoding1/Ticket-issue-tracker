'use client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { ErrorMessage, Spinner } from '@/app/components/index'
import { createIssueTracker } from '@/app/Validationschema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from "zod";


const SimpleMDE= dynamic(()=> import('react-simplemde-editor'),
{ssr:false});
  
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