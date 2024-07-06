import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import SelectCategory from '../components/SelectCategory'
import { Textarea } from '@/components/ui/textarea'
import { TipTapEditor } from '../components/Editor'
import { UploadDropzone } from '../lib/uploadthing'
import { Button } from '@/components/ui/button'
import { JSONContent } from '@tiptap/react'
import { error } from 'console'

function SellRoute() {
    const [json, setJson] = useState<null | JSONContent>(null);
    const [images , setImages] = useState<null | string[]>(null)
    const[productFile , setProductFile] = useState<null | string>(null)
    return (
        <section className='max-w-7xl mx-auto md:px-8 mb-14'>
            <Card>
                <form >
                    <CardHeader>
                        <CardTitle>
                            Sell your product with ease
                        </CardTitle>
                        <CardDescription>
                            Please describe your product here in details so that it can be sold
                        </CardDescription>
                    </CardHeader>


                    <CardContent className='flex flex-col gap-y-10'>
                        <div className="flex flex-col gap-y-2">
                            <Label>
                                Name
                            </Label>
                            <Input
                            name='name' type='text' placeholder='Name of your Product' />
                        </div>


                        <div className="flex flex-col gap-y-2">
                            <Label>Category</Label>
                            <SelectCategory />
                        </div>



                        <div className="flex flex-col gap-y-2">
                            <Label>Price</Label>
                            <Input 
                            name='price'
                            type='number' placeholder=' ₹ 99.00' />
                        </div>


                        <div className="flex flex-col gap-y-2">
                            <Label>Small Summary</Label>
                            <Textarea
                            name='smallDescription'
                             placeholder='Please describe your product shortly right here...' />
                        </div>


                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name='description' value={JSON.stringify(json)} />
                            <Label>
                                Description
                            </Label>
                            <TipTapEditor json={json} setJson={setJson} />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name='images' value={JSON.stringify(images)} />
                            <Label>Product Images</Label>
                            <UploadDropzone endpoint='imageUploader' 
                            onClientUploadComplete={(res)=> {
                                setImages(res.map((item) => item.url))
                                
                            }}
                            onUploadError={(error: Error)=>{
                                throw new Error(`${error}`)    
                            }}
                             />
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <input type="hidden" name='productFile' value={productFile ?? ""}/>
                        <Label>Product File</Label>
                        <UploadDropzone onClientUploadComplete={(res)=>{
                            setProductFile(res[0].url)
                        }}  
                        onUploadError={(error: Error)=>{
                            throw new Error(`${error}`)    
                        }} endpoint='productFileUpload'/>
                        </div>

                    </CardContent>
                    <CardFooter className='mt-5'>
                        <Button>Submit</Button>
                    </CardFooter>
                </form>
            </Card>
        </section>
    )
}

export default SellRoute
