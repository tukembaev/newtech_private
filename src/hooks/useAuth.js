import { useSelector } from 'react-redux'

export function useAuth() {
  const { userId, employeeId, token } = useSelector((state) => state.user)
  return {
    isAuth: !!userId,
    employeeId,
    token,
  }
}
