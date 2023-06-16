<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('overpass_queries', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable(false);
            $table->longText('description')->nullable(true);
            $table->longText('query')->nullable(false);
            $table->string('color')->nullable(false)->default('FFFFFF');
            $table->string('group')->nullable(false)->default('generic');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('overpass_queries');
    }
};
