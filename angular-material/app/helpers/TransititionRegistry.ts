import { IToasterService } from '../services/toaster-service/toater-service'

export namespace TransitionRegistry {


    export const RegisterTransition = ($transitions: any, name: string, ToasterService: IToasterService, LoadingMessage : string = 'Loading...') => {
        const to = name;
        $transitions.onStart({ to }, ($transition$: any) => {

            ToasterService.ShowAsProgress(LoadingMessage);
           
        })

        $transitions.onFinish({ to }, ($transition$: any) => {
            ToasterService.HideToaster();
        })
    }
}