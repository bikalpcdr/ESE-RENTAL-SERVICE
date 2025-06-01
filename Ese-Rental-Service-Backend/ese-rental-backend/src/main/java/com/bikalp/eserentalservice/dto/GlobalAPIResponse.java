package com.info.ocr.sharedservice.utils.global.apiresponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**

 * @for OCR
 * @since 1/26/2023 at 10:36 AM
 */

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
