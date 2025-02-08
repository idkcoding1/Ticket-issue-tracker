'use client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { ErrorMessage, Spinner } from '@/app/components/index'
import { IssueTracker } from '@/app/Validationschema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from "zod";
import { Issue } from '@prisma/client';


const SimpleMDE= dynamic(()=> import('react-simplemde-editor'),
{ssr:false});
  
type Issueformdata = z.infer<typeof IssueTracker>

interface Props {
  issue ?:Issue
}
 const Issueform = ({issue}:Props) => {
  
    const {register, control, handleSubmit, formState:{errors}} = useForm<Issueformdata>({
      resolver: zodResolver(IssueTracker)
    });
    const router= useRouter();
    const [error,setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    
    const onSubmit = handleSubmit(async(data) => {
      try {
        setSubmitting(true);
        if(issue)
          await axios.patch('/api/issues/'+issue.id,data);
        else{
         axios.post('/api/issues/',data);}
        router.push('/issues/list');
        router.refresh();
      } catch(error){
        console.error(error);

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
 }  
      <form 
      className="space-y-3" 
      onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder='title' {...register('title')}>

        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};
 
 export default Issueform