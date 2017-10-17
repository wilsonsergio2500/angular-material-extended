import { IToasterService } from '../services/toaster-service/toater-service'

export namespace TransitionRegistry {


    export const RegisterTransition = ($transitions: any, name: string, ToasterService: IToasterService) => {
        const to = name;
        $transitions.onStart({ to }, ($transition$: any) => {

            ToasterService.ShowAsProgress('Loading...');
           
        })

        $transitions.onFinish({ to }, ($transition$: any) => {
            ToasterService.HideToaster();
        })
    }
}