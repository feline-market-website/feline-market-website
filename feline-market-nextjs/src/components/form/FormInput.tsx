import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    
}
const FormInput: React.FC<Props> = ({name, type, placeholder, label}) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} name={name} placeholder={placeholder} />
    </div>
  );
};

export default FormInput;
