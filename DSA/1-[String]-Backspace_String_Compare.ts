// https://leetcode.com/problems/backspace-string-compare/
// Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.
// Note that after backspacing an empty text, the text will continue empty.

// brute force approach
// 1. evaluateBackspace(s)
// 2. evaluateBackspace(t)
// 3. compare s and t

function evaluateBackspace(s: string): string {
    const output: string[] = [];
    /**
        1) loop over Array and continue till control reaches to the end
        2) At every index check for '#' if '#' found remove prev char if exists 
        */

    for (let index = 0; index < s.length; index++) {
        const element: string = s[index];
        if (element !== "#") {
            output.push(element);
        } else {
            output.pop();
        }
    }
    return output.join("");
}

function backspaceCompareV1(s: string, t: string): boolean {
    /**
     * Constraints
     * 1. What if consecutive # appears e.g "ab##" -> 'ab'
     * 2. What if no character to delete e.g  "a####b" -> 'b'
     * 3. Case sensitive ? Yes e.g s= "ab" t= "Ab" -> false
     */

    // brute force approach
    s = evaluateBackspace(s);
    t = evaluateBackspace(t);

    return s === t;
}

// best approach
function backspaceCompareV2(s: string, t: string): boolean {
    let ptr1 = s.length - 1, ptr2 = t.length - 1;

    while (ptr1 >= 0 || ptr2 >= 0) {
        if (s[ptr1] === "#" || t[ptr2] === "#") {
            if (s[ptr1] === "#") {
                let backcount = 2;
                while (backcount > 0) {
                    ptr1--;
                    backcount--;
                    if (s[ptr1] === "#") {
                        backcount += 2;
                    }
                }
            }
            if (t[ptr2] === "#") {
                let backcount = 2;
                while (backcount > 0) {
                    ptr2--;
                    backcount--;
                    if (t[ptr2] === "#") {
                        backcount += 2;
                    }
                }
            }
        } else if (s[ptr1] !== t[ptr2]) {
            return false;
        } else {
            ptr1--;
            ptr2--;
        }
    }
    return true;
}

console.log(backspaceCompareV1("ab#c", "ad#c")); // true
console.log(backspaceCompareV1("ab##", "c#d#")); // true
console.log(backspaceCompareV1("a#c", "b")); // false

console.log(backspaceCompareV2("ab#c", "ad#c")); // true
console.log(backspaceCompareV2("ab##", "c#d#")); // true
console.log(backspaceCompareV2("a#c", "b")); // false
