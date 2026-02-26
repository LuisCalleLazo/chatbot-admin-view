export interface Response <T>
{
  succeeded : boolean,
  message: string,
  data: T
}