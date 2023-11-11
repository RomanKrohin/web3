package utils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import lombok.Data;

@ManagedBean
@SessionScoped
@Data
public class ResultsBean {
    
    private Result newResult= new Result();
    private List<Result> results= new ArrayList<Result>();

    public void addNewReult(){
        double start = System.nanoTime();
        newResult.setValue(String.valueOf(validate(Double.valueOf(newResult.getX()), Double.valueOf(newResult.getY()), Integer.valueOf(newResult.getR()))));
        double execTime = Math.round(((System.nanoTime() - start) * 0.00001) * 100.0) / 100.0;
        newResult.setExecTime(String.valueOf(execTime));
        newResult.setTime(String.valueOf(LocalDate.now()));
        results.add(newResult);
        newResult= new Result();
    }

    private Boolean validate(Double x, Double y, Integer r){
        if (x>=0 && y>=0 && x<=r/2 && y<=r){
            return true;
        }
        if (x<=0 && y<=0 && x>=-r && y>=x-r){
            return true;
        }
        if (x<=0 && y>=0 && Math.sqrt(x*x+y*y)<=r){
            return true;
        }
        return false;
    }

    public Result getNewResult(){
        return this.newResult;
    }
}
