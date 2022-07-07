import React from "react"
import AlbumForm from "../../components/album/album-form"
import PageLayout from "../../components/layout/page-layout"

function PriestCreate() {
  return (
    <PageLayout titleText='เพิ่มชุดเสียง'>
      <AlbumForm typeForm='create' />
    </PageLayout>
  )
}

export default PriestCreate
