import { Separator } from '@radix-ui/react-separator'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import React from 'react'
import { Card, CardContent } from '../ui/card'

const EditSection = () => {
  return (
    <div>
        <h2 className="text-xl font-semibold mb-4">Captions</h2>
          <Tabs defaultValue="captions" className="w-full">
            <TabsList className="w-full flex justify-around">
              <TabsTrigger value="captions">Captions</TabsTrigger>
              <TabsTrigger value="models">Models</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>
          </Tabs>
          <Separator className="my-4" />
          <Card>
            <CardContent className="p-4">
              <p className="text-sm">00:11 - 00:92</p>
              <p className="text-lg font-semibold">Hello et bienvenue sur</p>
            </CardContent>
          </Card>
    </div>
  )
}

export default EditSection