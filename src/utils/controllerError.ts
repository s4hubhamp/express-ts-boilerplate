import ControllerError from '../interfaces/ControllerError'

export default class implements ControllerError {
  constructor(public message: string, public status: number, public data?: any) {}
}
