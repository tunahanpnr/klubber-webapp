package com.spaghettiCoders.klubber.application.dto.response;

import com.spaghettiCoders.klubber.common.enums.Role;
import lombok.*;

@Getter
@RequiredArgsConstructor
public class LoginResDTO {
    private final String name;
    private final String surname;
    private final String username;
    private final String email;
    private final Role role;
}
