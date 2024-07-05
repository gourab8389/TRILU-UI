import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import SelectCategory from '../components/SelectCategory'
import { Textarea } from '@/components/ui/textarea'
import { TipTapEditor } from '../components/Editor'

function SellRoute() {
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
                    <Input type='text' placeholder='Name of your Product'/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Category</Label>
                    <SelectCategory/>
                </div>

                <div className="flex flex-col gap-y-2">
                    <Label>Price</Label>
                    <Input type='number' placeholder=' ₹ 99.00' />
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Small Summary</Label>
                    <Textarea placeholder='Please describe your product shortly right here...'/>
                </div>

                <div className="flex flex-col gap-y-2
                 ">
                    <Label>
                        Description
                    </Label>
                    <TipTapEditor/>
                 </div>
            </CardContent>
        </form>
    </Card>
   </section>
  )
}

export default SellRoute
