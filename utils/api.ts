import http from "./http"

const Auth = {
  login: (values: any) => http.post("auth/login/admin", values),
  getCurrentUser: () => http.get("auth/me"),
}

const Member = {
  getAll: (pageValue?: number, search?: string) =>
    http.get(`admin/user?page=${pageValue || 1}&search=${search || ""}`),
  get: (id: string) => http.get(`admin/user/${id}`),
  create: (values: any) => http.post("admin/user", values),
  update: (id: string, values: any) => http.patch(`admin/user/${id}`, values),
  updateIsActive: (id: string, isActive: boolean) =>
    http.patch(`admin/user/${id}/active`, {
      isActive,
    }),
  delete: (id: string) => http.delete(`admin/user/${id}`),
}

const Priest = {
  getNotPaginate: () => http.get("admin/priest?page=1&search=&limit=100"),
  getAll: (pageValue?: number, search?: string) =>
    http.get(`admin/priest?page=${pageValue || 1}&search=${search || ""}`),
  get: (id: string) => http.get(`admin/priest/${id}`),
  create: (values: any) => http.post("admin/priest", values),
  update: (id: string, values: any) => http.patch(`admin/priest/${id}`, values),
  updateIsActive: (id: string, isActive: boolean) =>
    http.patch(`admin/priest/${id}/active`, {
      isActive,
    }),
  delete: (id: string) => http.delete(`admin/priest/${id}`),
}

const Album = {
  getNotPaginate: () => http.get("admin/album?page=1&search=&limit=100"),
  getAll: (pageValue?: number, search?: string) =>
    http.get(`admin/album?page=${pageValue || 1}&search=${search || ""}`),
  get: (id: string) => http.get(`admin/album/${id}`),
  create: (values: any) => http.post("admin/album", values),
  update: (id: string, values: any) => http.patch(`admin/album/${id}`, values),
  updateIsActive: (id: string, isActive: boolean) =>
    http.patch(`admin/album/${id}/active`, {
      isActive,
    }),
  updateIsRecommend: (id: string, isRecommend: boolean) =>
    http.patch(`admin/album/${id}/recommend`, {
      isRecommend,
    }),
  delete: (id: string) => http.delete(`admin/album/${id}`),
}

const Contact = {
  getAll: (pageValue?: number, search?: string) =>
    http.get(`admin/contact?page=${pageValue || 1}&search=${search || ""}`),
  get: (id: string) => http.get(`admin/contact/${id}`),
  update: (id: string, values: any) =>
    http.patch(`admin/contact/${id}`, values),
  delete: (id: string) => http.delete(`admin/contact/${id}`),
}

const Audio = {
  getAll: (pageValue?: number, search?: string) =>
    http.get(`admin/audio?page=${pageValue || 1}&search=${search || ""}`),
  get: (id: string) => http.get(`admin/audio/${id}`),
  create: (values: any) => http.post("admin/audio", values),
  update: (id: string, values: any) => http.patch(`admin/audio/${id}`, values),
  updateIsActive: (id: string, isActive: boolean) =>
    http.patch(`admin/audio/${id}/active`, {
      isActive,
    }),
  delete: (id: string) => http.delete(`admin/audio/${id}`),
}

const Dashboard = {
  get: () => http.get("admin/dashboard"),
}
const Role = {
  getNotPaginate: () => http.get("admin/role?page=1&search=&limit=100"),
  getAll: (pageValue?: number, search?: string) => {
    return http.get(`admin/role?page=${pageValue || 1}&search=${search || ""}`)
  },
  get: (id: string) => http.get(`admin/role/${id}`),
  create: (values: any) => http.post("admin/role", values),
  update: (id: string, values: any) => http.patch(`admin/role/${id}`, values),
  delete: (id: string) => http.delete(`admin/role/${id}`),
  updateIsActive: (id: string, isActive: boolean) =>
    http.patch(`admin/role/${id}/active`, {
      isActive,
    }),
}

const api = {
  Auth,
  Member,
  Role,
  Priest,
  Album,
  Contact,
  Audio,
  Dashboard,
}

export default api
