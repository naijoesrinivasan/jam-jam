import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { BarChart, Bar, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

function TriangularBar(props)  {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
}
export default function AudioFeatures() {
  const { audioFeatures } = useOutletContext()
  const audioFeaturesArr = [audioFeatures]

  return (
    <section className='mt-4 flex justify-center'>
    {/* <ResponsiveContainer width={800} height="80%"> */}
      <BarChart width={800} height={500} data={audioFeaturesArr} className='text-[12px]' barCategoryGap={30}>
        <CartesianGrid strokeDasharray="5 10"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <XAxis />
        <Bar dataKey={"acousticness"} fill="#6CCCA8" shape={<TriangularBar />} />
        <Bar dataKey={"danceability"} fill="#7DA869" shape={<TriangularBar />}/>
        <Bar dataKey={"energy"} fill="#EAD66A" shape={<TriangularBar />}/>
        <Bar dataKey={"instrumentalness"} fill="#8F5320" shape={<TriangularBar />}/>
        <Bar dataKey={"liveness"} fill="#751510" shape={<TriangularBar />}/>
        <Bar dataKey={"speechiness"} fill="#581E5B" shape={<TriangularBar />}/>
        <Bar dataKey={"valence"} fill="#7453DB" shape={<TriangularBar />}/> 
      </BarChart>
    {/* </ResponsiveContainer> */}
    </section>
  )
}
