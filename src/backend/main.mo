import Map "mo:core/Map";
import Iter "mo:core/Iter";

import Nat "mo:core/Nat";


actor {
  type Student = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    pincode : Text;
    school : Text;
  };

  let students = Map.empty<Nat, Student>();
  var nextStudentId = 0;

  public shared ({ caller }) func registerStudent(name : Text, email : Text, phone : Text, pincode : Text, school : Text) : async Nat {
    let student : Student = {
      id = nextStudentId;
      name;
      email;
      phone;
      pincode;
      school;
    };
    students.add(nextStudentId, student);
    let currentId = nextStudentId;
    nextStudentId += 1;
    currentId;
  };

  public query ({ caller }) func loginStudent(phone : Text) : async ?Student {
    let matchingStudents = students.values().filter(
      func(student) {
        student.phone == phone;
      }
    );
    let firstMatch = matchingStudents.next();
    switch (firstMatch) {
      case (?student) { ?student };
      case (null) { null };
    };
  };

  public query ({ caller }) func getAllStudents() : async [Student] {
    students.values().toArray();
  };
};

