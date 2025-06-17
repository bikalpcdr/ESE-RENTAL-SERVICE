package com.bikalp.eserentalservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class GlobalAPIResponse {

    @NotNull
    private Boolean status;

    @NotNull
    private String message;

    private Object data;

}
