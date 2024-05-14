<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ConcurrencyController extends Controller
{
    public function testLostUpdateProblem()
    {
        $userId = 2;

        $update1 = ['firstname' => 'Jane', 'lastname' => 'Doe', 'email' => 'jane.doe@example.com'];
        $update2 = ['firstname' => 'Alice', 'lastname' => 'Smith', 'email' => 'alice.smith@example.com'];

        DB::transaction(function () use ($userId, $update1) {
            $user = User::findOrFail($userId);
            $user->firstname = $update1['firstname'];
            $user->lastname = $update1['lastname'];
            $user->email = $update1['email'];
            $user->password = Hash::make('123');
            $user->token = Str::uuid();
            $user->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
            $user->save();
        });

        DB::transaction(function () use ($userId, $update2) {
            $user = User::findOrFail($userId);
            $user->firstname = $update2['firstname'];
            $user->lastname = $update2['lastname'];
            $user->email = $update2['email'];
            $user->password = Hash::make('123');
            $user->token = Str::uuid();
            $user->token_expires_at = Carbon::now()->addDays(30)->toDateTimeString();
            $user->save();
        });

        $updatedUser = User::findOrFail($userId);

        return response()->json(['response' => 'ok', 'data' => $updatedUser]);
    }

    public function testTemporaryUpdateProblem()
    {
        $userId = 3; 

        DB::transaction(function () use ($userId) {
            $user = User::findOrFail($userId);
            $user->firstname = 'Jane';
            $user->save();
        });

        $user = DB::transaction(function () use ($userId) {
            $user = User::findOrFail($userId);
            return $user;
        });

        return response()->json(['response' => 'ok', 'data' =>$user]);
    }

    public function testIncorrectSummaryProblem()
    {
        $userId1 = 2; 
        $userId2 = 3; 

        DB::transaction(function () use ($userId1) {
            $user = User::findOrFail($userId1);
            $user->firstname = 'Jane';
            $user->save();
        });

        $count = DB::transaction(function () {
            $users = User::all();
            return $users->count();
        });

        return response()->json(['response' => 'ok', 'data' => $count]);
    }

    public function testUnrepeatableReadProblem()
    {
        $userId = 2; 

        $result = DB::transaction(function () use ($userId) {
            $user = User::findOrFail($userId);
            $firstRead = $user->firstname;

            sleep(1);

            $user = User::findOrFail($userId);
            $secondRead = $user->firstname;

            return ['first_read' => $firstRead, 'second_read' => $secondRead];
        });

        DB::transaction(function () use ($userId) {
            sleep(0.5);
            $user = User::findOrFail($userId);
            $user->firstname = 'Jane';
            $user->save();
        });

        return response()->json(['response' => 'ok', 'data' => $result]);
    }

    public function testPhantomReadProblem()
    {
        $result = DB::transaction(function () {
            $users = User::all();
            $firstCount = $users->count();

            sleep(1);

            $users = User::all();
            $secondCount = $users->count();

            return ['first_count' => $firstCount, 'second_count' => $secondCount];
        });

        DB::transaction(function () {
            sleep(0.5);
            User::create([
                'firstname' => 'Alice',
                'lastname' => 'Smith',
                'email' => 'alice'.date('Ydmhis').'.smith@example.com',
                'password' => Hash::make('password'),
                'token' => Str::uuid(),
                'token_expires_at' => now()->addHours(1)
            ]);
        });

        return response()->json(['response' => 'ok', 'data' => $result]);
    }
}
