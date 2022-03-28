export default interface IConnectObject {
    name: string;
    connectMethod: () => void | Promise<void>;
    img: string;
    width: number;
    height: number;
}
