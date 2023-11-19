"use client";
import React from "react";

interface Props {
  onSelectLanguage: (language: string) => void;
}

const SelectLanguage = ({ onSelectLanguage }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectLanguage(event.target.value);
  };
  const laguages = [
    { value: "43", label: "GNU GCC C11 5.1.0" },
    { value: "80", label: "Clang++20 Diagnostics" },
    { value: "52", label: "Clang++17 Diagnostics" },
    { value: "50", label: "GNU G++14 6.4.0" },
    { value: "54", label: "GNU G++17 7.3.0" },
    { value: "73", label: "GNU G++20 11.2.0 (64 bit, winlibs)" },
    { value: "59", label: "Microsoft Visual C++ 2017" },
    { value: "61", label: "GNU G++17 9.2.0 (64 bit, msys 2)" },
    { value: "65", label: "C# 8, .NET Core 3.1" },
    { value: "79", label: "C# 10, .NET SDK 6.0" },
    { value: "9", label: "C# Mono 6.8" },
    { value: "28", label: "D DMD32 v2.105.0" },
    { value: "32", label: "Go 1.19.5" },
    { value: "12", label: "Haskell GHC 8.10.1" },
    { value: "60", label: "Java 11.0.6" },
    { value: "74", label: "Java 17 64bit" },
    { value: "87", label: "Java 21 64bit" },
    { value: "36", label: "Java 1.8.0_241" },
    { value: "77", label: "Kotlin 1.6.10" },
    { value: "83", label: "Kotlin 1.7.20" },
    { value: "19", label: "OCaml 4.02.1" },
    { value: "3", label: "Delphi 7" },
    { value: "4", label: "Free Pascal 3.2.2" },
    { value: "51", label: "PascalABC.NET 3.8.3" },
    { value: "13", label: "Perl 5.20.1" },
    { value: "6", label: "PHP 8.1.7" },
    { value: "7", label: "Python 2.7.18" },
    { value: "31", label: "Python 3.8.10" },
    { value: "40", label: "PyPy 2.7.13 (7.3.0)" },
    { value: "41", label: "PyPy 3.6.9 (7.3.0)" },
    { value: "70", label: "PyPy 3.9.10 (7.3.9, 64bit)" },
    { value: "67", label: "Ruby 3.2.2" },
    { value: "75", label: "Rust 1.72.0 (2021)" },
    { value: "20", label: "Scala 2.12.8" },
    { value: "34", label: "JavaScript V8 4.8.0" },
    { value: "55", label: "Node.js 15.8.0 (64bit)" },
  ];
  return (
    <div>
      Submitsss
      <select
        className="select select-primary w-full max-w-xs"
        onChange={handleChange}
      >
        {laguages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLanguage;
