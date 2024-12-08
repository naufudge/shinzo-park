import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Facebook, IndianRupee, InstagramIcon } from 'lucide-react'


export default function selector() {
    const [icon, setIcon] = useState('')

    const HandleSubmit: any(setIcon: string) {
        setIcon(Selector(setIcon))
    }



    return (
        <>
            <div>
                <Select>
                    <SelectTrigger className="w-[180px]" onClick={() => handleSubmit(value)}>
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}


function Selector(icon: string) {
    const iconOfChoice = icon

    switch (iconOfChoice) {
        case "facebook":
            return Facebook
            break;

        case "facebook":
            return Facebook
            break;
        default:
            return ""
            break;
    }
}