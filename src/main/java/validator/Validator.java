package validator;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.ValidatorException;

@FacesValidator("validator")
public class Validator implements javax.faces.validator.Validator{


    @Override
    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
            String input = value.toString();
            if (input.matches(".*\\D.")){
                FacesMessage message= new FacesMessage(
                        "Values must be numeric");
                throw new ValidatorException(message);
            }
            if (Integer.valueOf(input) <-3){
                FacesMessage message= new FacesMessage(
                        "x need be >-3");
                throw new ValidatorException(message);
            }
            
            if (Integer.valueOf(input)>5){
                FacesMessage message= new FacesMessage(
                        "x need be <5");
                throw new ValidatorException(message);
            }
        }
}