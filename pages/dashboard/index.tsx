import React, { useEffect, useState } from "react"
import StatusCard from "../../components/card/status-card/status-card"
import PageLayout from "../../components/layout/page-layout"
import { BsPerson } from "react-icons/bs"
import { Box, Flex, Heading } from "@chakra-ui/react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import Loading from "../../components/loading/loading"
import api from "../../utils/api"

function DashboardIndex() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    api.Dashboard.get()
      .then((res) => {
        setData(res.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  return (
    <PageLayout titleText='Dashboard'>
      {isLoading ? (
        <Loading />
      ) : (
        <Box>
          <Flex flexWrap='wrap'>
            <StatusCard
              title='สมาชิก'
              description='จำนวนสมาชิกทั้งหมด'
              icon={<BsPerson size='44px' />}
              stat={data.userCount}
            />
            <StatusCard
              title='ชุดเสียง'
              description='จำนวนชุดเสียงทั้งหมด'
              icon={<BsPerson size='44px' />}
              stat={data.albumCount}
            />
            <StatusCard
              title='การฟัง'
              description='จำนวนการฟังเสียงทั้งหมด'
              icon={<BsPerson size='44px' />}
              stat={data.contactCount}
            />
            <StatusCard
              title='ข้อความ'
              description='จำนวนข้อความที่รอตอบกลับ'
              icon={<BsPerson size='44px' />}
              stat={data.playlistCount}
            />
          </Flex>
          <Box mt='25px' height='500px'>
            <Heading fontSize='2xl' marginBottom='25px' color='gray.600'>
              กราฟสถิติจำนวนเสียงที่ถูกเล่นทั้ง 12 เดือน
            </Heading>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                width={500}
                height={300}
                data={data.chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='mlabel' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='value' fill='#38B2AC' />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      )}
    </PageLayout>
  )
}

export default DashboardIndex
